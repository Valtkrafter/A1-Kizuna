export interface SubRuleExample {
  japanese: string;
  romaji: string;
  german: string;
}

export interface SubRuleTask {
  type: 'cloze' | 'order';
  prompt: string;
  translation: string;
  options?: string[];
  correctAnswer: string;
  orderChips?: string[];
  explanation: string;
}

export interface SubRule {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  examples: SubRuleExample[];
  tasks: SubRuleTask[];
}

export interface GrammarTopicSheet {
  id: string;
  title: string;
  description: string;
  category: string;
  subRules: SubRule[];
}

export type ThemeMode = 'light' | 'dark';

export interface SubRuleScore {
  correct: number;
  total: number;
  passed: boolean;
}

export interface SheetProgressData {
  passedSubRuleIds: string[];
  subRuleScores: Record<string, SubRuleScore>;
  soundEnabled: boolean;
}
