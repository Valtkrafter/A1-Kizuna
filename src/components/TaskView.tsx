import React from 'react';
import { motion } from 'framer-motion';
import { AutoJapanese } from './AutoJapanese';
import { soundEffects } from '../utils/soundEffects';

interface TaskViewProps {
  options: string[];
  selectedOption: string | null;
  correctAnswer: string;
  isAnswered: boolean;
  onSelectOption: (option: string) => void;
}

export const TaskView: React.FC<TaskViewProps> = ({
  options,
  selectedOption,
  correctAnswer,
  isAnswered,
  onSelectOption,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 overflow-visible">
      {options.map((option, index) => {
        const isSelected = selectedOption === option;
        const isCorrect = option === correctAnswer;

        let containerStyle =
          'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-900 dark:text-slate-100 shadow-sm';
        let badgeStyle =
          'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/80';

        if (isSelected && !isAnswered) {
          containerStyle =
            'border-blue-600 dark:border-sky-500 bg-blue-50/70 dark:bg-sky-950/40 text-blue-900 dark:text-sky-200 ring-2 ring-blue-500/30 dark:ring-sky-500/40 shadow-md';
          badgeStyle =
            'bg-blue-600 dark:bg-sky-500 text-white border-transparent';
        }

        if (isAnswered) {
          if (isCorrect) {
            containerStyle =
              'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/40';
            badgeStyle = 'bg-emerald-600 text-white border-transparent';
          } else if (isSelected && !isCorrect) {
            containerStyle =
              'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/40';
            badgeStyle = 'bg-rose-600 text-white border-transparent';
          } else {
            containerStyle =
              'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-slate-400 opacity-40';
          }
        }

        return (
          <motion.button
            key={`${option}-${index}`}
            whileHover={!isAnswered ? { scale: 1.015, y: -2 } : {}}
            whileTap={!isAnswered ? { scale: 0.985 } : {}}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            type="button"
            disabled={isAnswered}
            onClick={() => {
              if (isAnswered) return;
              soundEffects.playClick();
              onSelectOption(option);
            }}
            className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all text-left overflow-visible cursor-pointer ${containerStyle}`}
          >
            <span className="text-lg font-medium tracking-wide overflow-visible">
              <AutoJapanese text={option} />
            </span>
            <span
              className={`flex items-center justify-center w-6 h-6 rounded-lg text-xs font-mono font-bold border transition-colors shrink-0 ${badgeStyle}`}
            >
              {index + 1}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};
