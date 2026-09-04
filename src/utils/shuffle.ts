import type { SubRule, TaskItem } from '../types';

/**
 * Fisher-Yates (Knuth) shuffle algorithm.
 * Returns a new array with randomized element positions without mutating the original input.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Scramble chips with guarantee that they are not already in the solved sequence.
 */
export function getScrambledChips(chips: string[], correctOrder: string[]): string[] {
  if (chips.length <= 1) return chips;
  let scrambled = shuffleArray(chips);
  let attempts = 0;

  // Re-shuffle if it coincidentally matches the solved sequence
  while (scrambled.join('') === correctOrder.join('') && attempts < 10) {
    scrambled = shuffleArray(chips);
    attempts++;
  }
  return scrambled;
}

/**
 * Creates a dynamic 5-question session from the sub-rule question pool.
 */
export function startSubRuleSession(subRule: SubRule): TaskItem[] {
  // 1. Shuffle all available tasks in the sub-rule pool
  const shuffledPool = shuffleArray(subRule.tasks);

  // 2. Select 5 fresh questions for this run
  return shuffledPool.slice(0, 5);
}

