export interface RealLifeContext {
  badge: string;
  why: string;
  when: string[];
  signalWords?: string[];
  quickTip: string;
}

export interface ExampleSentence {
  japanese: string;
  romaji: string;
  german: string;
}

export interface TaskItem {
  id: string;
  type: 'cloze' | 'order';
  prompt: string;
  german: string;
  options?: string[];
  correctAnswer: string;
  chips?: string[];
  correctOrder?: string[];
  explanation: string;
}

export interface SubRule {
  id: string;
  title: string;
  formula: string;
  explanation: string;
  realLifeContext: RealLifeContext;
  examples: ExampleSentence[];
  tasks: TaskItem[];
}

export interface TopicModule {
  id: string;
  title: string;
  category: 'Grundlagen' | 'Partikeln' | 'Verben' | 'Existenz' | 'Adjektive' | 'Te-Form';
  subRules: SubRule[];
}
