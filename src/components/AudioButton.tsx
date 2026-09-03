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
          ? 'text-sky-500 dark:text-sky-400 bg-sky-500/10 ring-1 ring-sky-400'
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
      } ${className}`}
      title="Aussprache anhören"
      aria-label="Aussprache anhören"
    >
      <Volume2
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          isPlaying ? 'animate-pulse text-sky-500 dark:text-sky-400' : ''
        }`}
      />
    </button>
  );
};
