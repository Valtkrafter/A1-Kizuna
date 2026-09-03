import type { SheetProgressData, ThemeMode } from '../types';

const PROGRESS_KEY = 'kizuna_sheet_progress_v2';
const THEME_KEY = 'kizuna_theme_v1';

export function loadTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    // fallback
  }
  if (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  }
  return 'light';
}

export function saveTheme(theme: ThemeMode): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

export function loadSheetProgress(): SheetProgressData {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        passedSubRuleIds: parsed.passedSubRuleIds || [],
        subRuleScores: parsed.subRuleScores || {},
        soundEnabled: parsed.soundEnabled ?? true,
      };
    }
  } catch {
    // fallback
  }
  return {
    passedSubRuleIds: [],
    subRuleScores: {},
    soundEnabled: true,
  };
}

export function saveSheetProgress(progress: SheetProgressData): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function markSubRulePassed(
  subRuleId: string,
  score: number,
  total: number
): SheetProgressData {
  const current = loadSheetProgress();
  const passedSet = new Set(current.passedSubRuleIds);
  passedSet.add(subRuleId);

  const updated: SheetProgressData = {
    ...current,
    passedSubRuleIds: Array.from(passedSet),
    subRuleScores: {
      ...current.subRuleScores,
      [subRuleId]: { correct: score, total, passed: true },
    },
  };

  saveSheetProgress(updated);
  return updated;
}

export function resetSheetProgress(): SheetProgressData {
  const fresh: SheetProgressData = {
    passedSubRuleIds: [],
    subRuleScores: {},
    soundEnabled: true,
  };
  saveSheetProgress(fresh);
  return fresh;
}
