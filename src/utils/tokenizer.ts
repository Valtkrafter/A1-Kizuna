import { A1_DICTIONARY } from '../data/dictionary';

// Strict particle set to force boundaries so particles never fuse with nouns
export const PARTICLES = new Set(['を', 'は', 'が', 'に', 'で', 'の', 'と', 'も', 'か', 'や', 'へ']);

export interface Token {
  text: string;
  isBlank: boolean;
  isPunctuation: boolean;
  isWord: boolean;
}

// Splits Japanese and mixed text into discrete words/particles using longest-match dictionary lookup
export function tokenizeJapanese(text: string): Token[] {
  const dictKeys = Object.keys(A1_DICTIONARY).sort((a, b) => b.length - a.length);
  const tokens: Token[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // 1. Check for Cloze Blanks (_____ or ___)
    const blankMatch = remaining.match(/^_{2,}/);
    if (blankMatch) {
      tokens.push({ text: blankMatch[0], isBlank: true, isPunctuation: false, isWord: false });
      remaining = remaining.slice(blankMatch[0].length);
      continue;
    }

    // 2. Check for Punctuation or Spaces (、, 。, ・, 「, 」, spaces, etc.)
    const punctMatch = remaining.match(/^[、。・「」『』\s!?！？,.]/);
    if (punctMatch) {
      tokens.push({ text: punctMatch[0], isBlank: false, isPunctuation: true, isWord: false });
      remaining = remaining.slice(punctMatch[0].length);
      continue;
    }

    // 3. Match Longest Dictionary Word (Longest-Match-First)
    let matched = false;
    for (const key of dictKeys) {
      if (remaining.startsWith(key)) {
        tokens.push({ text: key, isBlank: false, isPunctuation: false, isWord: true });
        remaining = remaining.slice(key.length);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 4. Isolated Single Particles Fallback (Ensures を, に, で never stick to adjacent text)
    const firstChar = remaining[0];
    if (PARTICLES.has(firstChar)) {
      tokens.push({ text: firstChar, isBlank: false, isPunctuation: false, isWord: true });
      remaining = remaining.slice(1);
      continue;
    }

    // 5. Check for Latin / German word chunks & symbols (so words like "Beim" or "[Ort]" stay intact)
    const latinMatch = remaining.match(/^[a-zA-Z0-9äöüÄÖÜß+→/—\-:()[\]~]+/);
    if (latinMatch) {
      tokens.push({ text: latinMatch[0], isBlank: false, isPunctuation: false, isWord: false });
      remaining = remaining.slice(latinMatch[0].length);
      continue;
    }

    // 6. Fallback: Take a single character so it NEVER clumps into giant blocks
    tokens.push({ text: remaining[0], isBlank: false, isPunctuation: false, isWord: false });
    remaining = remaining.slice(1);
  }

  return tokens;
}

export const tokenizeSentence = tokenizeJapanese;
