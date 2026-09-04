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

export interface RealLifeContext {
  badge: string;            // z.B. "Alltags-Situation"
  why: string;              // Wofür braucht man das im echten Leben? (1 Satz)
  when: string[];           // 2-3 konkrete Alltags-Momente
  signalWords?: string[];   // Typische Wörter, die diese Form triggern (z.B. 毎日, 昨日, 今)
  quickTip: string;         // Mentale Eselsbrücke / Vergleich zu Englisch
}

export interface SubRule {
  id: string;
  title: string;
  explanation: string;
  formula: string;
  realLifeContext: RealLifeContext;
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
