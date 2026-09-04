import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { japaneseAudio } from '../utils/speech';

export const AudioButton: React.FC<{ text: string; className?: string }> = ({
  text,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        japaneseAudio.play(
          text,
          () => setIsPlaying(true),
          () => setIsPlaying(false)
        );
      }}
      className={`p-2 rounded-lg transition-all active:scale-90 shrink-0 ${
        isPlaying
          ? 'text-slate-900 dark:text-slate-100 bg-slate-200 dark:bg-slate-800 ring-1 ring-slate-400 dark:ring-slate-600'
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${className}`}
      title="Aussprache anhören (ja-JP)"
      aria-label="Aussprache anhören"
    >
      <Volume2
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          isPlaying ? 'animate-pulse text-slate-900 dark:text-slate-100' : ''
        }`}
      />
    </button>
  );
};
