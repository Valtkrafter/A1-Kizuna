import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AutoJapanese } from './AutoJapanese';
import { AudioButton } from './AudioButton';
import { soundEffects } from '../utils/soundEffects';

interface SentenceBuilderProps {
  selectedChips: string[];
  availableChips: string[];
  disabled?: boolean;
  audioText?: string;
  onSelectChip: (chip: string, index: number) => void;
  onRemoveChip: (chip: string, index: number) => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  selectedChips,
  availableChips,
  disabled = false,
  audioText,
  onSelectChip,
  onRemoveChip,
}) => {
  return (
    <div className="space-y-6 overflow-visible">
      {/* Target Sentence Dock */}
      <div className="min-h-[80px] p-4 sm:p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700/80 bg-white/60 dark:bg-[#090D16]/60 flex flex-wrap items-center gap-2.5 transition-colors overflow-visible relative">
        {selectedChips.length === 0 ? (
          <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium select-none mx-auto py-2">
            Klicke unten auf die Bausteine, um den Satz zu formen
          </span>
        ) : (
          <AnimatePresence>
            {selectedChips.map((chip, idx) => (
              <motion.button
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                key={`selected-${chip}-${idx}`}
                type="button"
                disabled={disabled}
                onClick={() => {
                  if (disabled) return;
                  soundEffects.playClick();
                  onRemoveChip(chip, idx);
                }}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-sky-50 dark:bg-sky-500/15 hover:bg-rose-50 dark:hover:bg-rose-500/20 border border-sky-300 dark:border-sky-400/40 hover:border-rose-400 text-sky-950 dark:text-slate-100 font-semibold text-base sm:text-lg cursor-pointer transition-colors shadow-sm overflow-visible"
                title="Antippen zum Entfernen"
              >
                <AutoJapanese text={chip} />
              </motion.button>
            ))}
          </AnimatePresence>
        )}

        {/* Audio Button on Dock */}
        {audioText && (
          <AudioButton text={audioText} className="absolute top-2 right-2" />
        )}
      </div>

      {/* Scrambled Chips Pool */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 overflow-visible">
        {availableChips.map((chip, idx) => (
          <motion.button
            layout
            whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            key={`avail-${chip}-${idx}`}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              soundEffects.playClick();
              onSelectChip(chip, idx);
            }}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-900 dark:text-slate-100 font-medium text-base sm:text-lg cursor-pointer shadow-sm hover:shadow-md transition-all overflow-visible"
          >
            <AutoJapanese text={chip} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
