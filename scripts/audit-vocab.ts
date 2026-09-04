import { SYLLABUS } from '../src/data/syllabus';
import { A1_DICTIONARY } from '../src/data/dictionary';
import { tokenizeJapanese } from '../src/utils/tokenizer';

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

// 1. Tokens produced by tokenizeJapanese that are NOT in dictionary and contain Kanji
const missingKanjiTokens = new Map<string, Set<string>>();
// 2. Multi-kana tokens produced by tokenizeJapanese not in dictionary
const missingMultiKanaTokens = new Map<string, Set<string>>();
// 3. Contiguous Kanji sequences (2+ Kanji, e.g. 医者, 会社員) missing from dictionary
const missingKanjiCompounds = new Map<string, Set<string>>();
// 4. Polite family/honorific terms (e.g. お父さん, お母さん) missing from dictionary
const missingPoliteTerms = new Map<string, Set<string>>();

for (const item of allStrings) {
  if (!JAPANESE_REGEX.test(item.text)) continue;

  const tokens = tokenizeJapanese(item.text);
  for (const token of tokens) {
    if (token.isBlank || token.isPunctuation) continue;
    if (!JAPANESE_REGEX.test(token.text)) continue;

    const clean = token.text.replace(/[〜~「」()（）*]/g, '').trim();
    if (!clean) continue;

    const inDict = Boolean(A1_DICTIONARY[token.text] || A1_DICTIONARY[clean]);
    if (!inDict) {
      if (KANJI_REGEX.test(clean)) {
        if (!missingKanjiTokens.has(clean)) missingKanjiTokens.set(clean, new Set());
        missingKanjiTokens.get(clean)!.add(item.location);
      } else if (clean.length > 1) {
        if (!missingMultiKanaTokens.has(clean)) missingMultiKanaTokens.set(clean, new Set());
        missingMultiKanaTokens.get(clean)!.add(item.location);
      }
    }
  }

  // Find 2+ Kanji sequences
  const kanjiSeqMatches = item.text.match(/[\u4E00-\u9FAF]{2,}/g) || [];
  for (const seq of kanjiSeqMatches) {
    if (!A1_DICTIONARY[seq]) {
      if (!missingKanjiCompounds.has(seq)) missingKanjiCompounds.set(seq, new Set());
      missingKanjiCompounds.get(seq)!.add(item.location);
    }
  }

  // Find polite terms like お〜さん, ご〜
  const politeMatches = item.text.match(/[おご御][\u4E00-\u9FAFぁ-ん]+(?:さん|様)?/g) || [];
  for (const term of politeMatches) {
    if (!A1_DICTIONARY[term]) {
      if (!missingPoliteTerms.has(term)) missingPoliteTerms.set(term, new Set());
      missingPoliteTerms.get(term)!.add(item.location);
    }
  }
}

console.log(`=== 1. TOKENS CONTAINING KANJI MISSING FROM DICTIONARY (${missingKanjiTokens.size}) ===`);
for (const [token, locs] of Array.from(missingKanjiTokens.entries()).sort()) {
  console.log(`- "${token}" (x${locs.size}, e.g. ${Array.from(locs)[0]})`);
}

console.log(`\n=== 2. KANJI COMPOUNDS (2+ KANJI) MISSING FROM DICTIONARY (${missingKanjiCompounds.size}) ===`);
for (const [seq, locs] of Array.from(missingKanjiCompounds.entries()).sort()) {
  console.log(`- "${seq}" (x${locs.size}, e.g. ${Array.from(locs)[0]})`);
}

console.log(`\n=== 3. POLITE / FAMILY / HONORIFIC TERMS MISSING FROM DICTIONARY (${missingPoliteTerms.size}) ===`);
for (const [term, locs] of Array.from(missingPoliteTerms.entries()).sort()) {
  console.log(`- "${term}" (x${locs.size}, e.g. ${Array.from(locs)[0]})`);
}

console.log(`\n=== 4. MULTI-KANA TOKENS MISSING FROM DICTIONARY (${missingMultiKanaTokens.size}) ===`);
for (const [token, locs] of Array.from(missingMultiKanaTokens.entries()).sort()) {
  console.log(`- "${token}" (x${locs.size}, e.g. ${Array.from(locs)[0]})`);
}
