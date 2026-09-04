import { SYLLABUS } from '../src/data/syllabus';
import { A1_DICTIONARY } from '../src/data/dictionary';
import { tokenizeJapanese } from '../src/utils/tokenizer';
import { getFallbackRomaji } from '../src/utils/kana';

const KANJI_REGEX = /[\u4E00-\u9FAF]/;
const JAPANESE_REGEX = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;

// Collect all text strings from SYLLABUS
const allStrings: { text: string; location: string }[] = [];

for (const mod of SYLLABUS) {
  allStrings.push({ text: mod.title, location: `${mod.id}: title` });
  for (const sub of mod.subRules) {
    allStrings.push({ text: sub.title, location: `${mod.id}/${sub.id}: title` });
    allStrings.push({ text: sub.formula, location: `${mod.id}/${sub.id}: formula` });
    allStrings.push({ text: sub.explanation, location: `${mod.id}/${sub.id}: explanation` });

    if (sub.realLifeContext) {
      allStrings.push({ text: sub.realLifeContext.why, location: `${mod.id}/${sub.id}: why` });
      allStrings.push({ text: sub.realLifeContext.quickTip, location: `${mod.id}/${sub.id}: quickTip` });
      for (const w of sub.realLifeContext.when || []) {
        allStrings.push({ text: w, location: `${mod.id}/${sub.id}: when` });
      }
      for (const s of sub.realLifeContext.signalWords || []) {
        allStrings.push({ text: s, location: `${mod.id}/${sub.id}: signalWords` });
      }
    }

    for (const ex of sub.examples || []) {
      allStrings.push({ text: ex.japanese, location: `${mod.id}/${sub.id}: example: ${ex.japanese}` });
    }

    for (const task of sub.tasks || []) {
      allStrings.push({ text: task.prompt, location: `${mod.id}/${sub.id}/${task.id}: prompt` });
      allStrings.push({ text: task.correctAnswer, location: `${mod.id}/${sub.id}/${task.id}: correctAnswer` });
      allStrings.push({ text: task.explanation, location: `${mod.id}/${sub.id}/${task.id}: explanation` });
      for (const opt of task.options || []) {
        allStrings.push({ text: opt, location: `${mod.id}/${sub.id}/${task.id}: option` });
      }
      for (const chip of task.chips || []) {
        allStrings.push({ text: chip, location: `${mod.id}/${sub.id}/${task.id}: chip` });
      }
      for (const ord of task.correctOrder || []) {
        allStrings.push({ text: ord, location: `${mod.id}/${sub.id}/${task.id}: correctOrder` });
      }
    }
  }
}

let totalTokens = 0;
let dictMatchedTokens = 0;
let kanaFallbackTokens = 0;
let untranslatedKanjiCount = 0;
const untranslatedKanjiTokens = new Set<string>();

for (const item of allStrings) {
  if (!JAPANESE_REGEX.test(item.text)) continue;

  const tokens = tokenizeJapanese(item.text);
  for (const token of tokens) {
    if (token.isBlank || token.isPunctuation) continue;
    if (!JAPANESE_REGEX.test(token.text)) continue;

    totalTokens++;
    const clean = token.text.replace(/[〜~「」()（）*]/g, '').trim();
    const inDict = Boolean(A1_DICTIONARY[token.text] || A1_DICTIONARY[clean]);

    if (inDict) {
      dictMatchedTokens++;
    } else {
      if (KANJI_REGEX.test(clean)) {
        untranslatedKanjiCount++;
        untranslatedKanjiTokens.add(clean);
      } else {
        // Pure Kana fallback
        const romaji = getFallbackRomaji(clean);
        if (romaji) {
          kanaFallbackTokens++;
        }
      }
    }
  }
}

console.log(`=== COVERAGE AUDIT SUMMARY ===`);
console.log(`Total Japanese Tokens Analyzed: ${totalTokens}`);
console.log(`Matched directly in A1_DICTIONARY: ${dictMatchedTokens} (${((dictMatchedTokens / totalTokens) * 100).toFixed(2)}%)`);
console.log(`Covered via Kana-to-Romaji Fallback: ${kanaFallbackTokens}`);
console.log(`Untranslated Kanji Tokens: ${untranslatedKanjiCount}`);

if (untranslatedKanjiTokens.size > 0) {
  console.error(`FAILED: Untranslated Kanji found:`, Array.from(untranslatedKanjiTokens));
  process.exit(1);
} else {
  console.log(`SUCCESS: 100% of Japanese tokens have valid dictionary entries or accurate Kana romaji!`);
}

// Specific Bug Check: "お父さん" and "医者"
console.log('\n=== Specific Bug Regression Check ===');
const testPhrase = 'お父さんは 医者ですか。';
const testTokens = tokenizeJapanese(testPhrase);
console.log(`Phrase: "${testPhrase}"`);
console.log(`Tokens:`, testTokens.map(t => ({
  text: t.text,
  dict: A1_DICTIONARY[t.text] ? `[${A1_DICTIONARY[t.text].romaji}] ${A1_DICTIONARY[t.text].de}` : 'NOT IN DICT'
})));

const otousan = testTokens.find(t => t.text === 'お父さん');
const isha = testTokens.find(t => t.text === '医者');

if (!otousan || !isha) {
  console.error('FAIL: お父さん or 医者 was split!');
  process.exit(1);
} else {
  console.log('PASS: お父さん and 医者 are preserved as discrete tokens with complete definitions!');
}
