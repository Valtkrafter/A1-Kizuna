import type {
  ExampleSentence,
  TaskItem,
  TopicModule,
} from './types/curriculum';

export * from './types/curriculum';

// Compatibility aliases for existing components
export type SubRuleExample = ExampleSentence;
export type SubRuleTask = TaskItem;

export interface GrammarTopicSheet extends TopicModule {
  description?: string;
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
