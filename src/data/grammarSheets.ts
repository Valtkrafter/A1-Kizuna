import { SYLLABUS } from './syllabus';
import type { GrammarTopicSheet } from '../types';

export const GRAMMAR_SHEETS: GrammarTopicSheet[] = SYLLABUS.map((mod) => ({
  ...mod,
  description: `${mod.subRules.length} Lerneinheiten • ${mod.category}`,
}));
