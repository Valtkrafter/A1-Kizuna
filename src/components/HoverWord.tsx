import React, { useState, useRef } from 'react';
import { A1_DICTIONARY } from '../data/dictionary';
import { getFallbackRomaji } from '../utils/kana';

export const HoverWord: React.FC<{ word: string }> = ({ word }) => {
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const spanRef = useRef<HTMLSpanElement>(null);

  // 1. Suche im Diktionär (exakt oder ohne Satzzeichen)
  const cleanWord = word.replace(/[〜~「」()（）*]/g, '').trim();
  const dictInfo = A1_DICTIONARY[word] || A1_DICTIONARY[cleanWord];

  // 2. Garantiere immer Romaji (aus Diktionär oder Fallback-Konverter)
  const romaji = dictInfo?.romaji || getFallbackRomaji(cleanWord || word);
  const meaning = dictInfo?.de || '';

  const updateAlignment = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      if (rect.left < 90) {
        setAlign('left');
      } else if (window.innerWidth - rect.right < 90) {
        setAlign('right');
      } else {
        setAlign('center');
      }
    }
  };

  const handleOpen = () => {
    updateAlignment();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let tooltipClass = 'left-1/2 -translate-x-1/2';
  let arrowClass = 'left-1/2 -translate-x-1/2';
  if (align === 'left') {
    tooltipClass = 'left-0 translate-x-0';
    arrowClass = 'left-3 translate-x-0';
  } else if (align === 'right') {
    tooltipClass = 'right-0 left-auto translate-x-0';
    arrowClass = 'right-3 left-auto translate-x-0';
  }

  return (
    <span
      ref={spanRef}
      className="relative inline-block cursor-pointer mx-[1px] overflow-visible"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      // IMPORTANT: Do NOT use e.stopPropagation() here!
      // Let the click event bubble up to the parent <button> or chip container.
    >
      {/* Individual dotted underline per token */}
      <span className="underline decoration-dotted decoration-sky-400 dark:decoration-sky-500 underline-offset-4 hover:text-sky-400 transition-colors pointer-events-auto">
        {word}
      </span>

      {/* Tooltip rendert nur wenn romaji oder meaning vorhanden ist */}
      {open && (romaji || meaning) && (
        <span
          role="tooltip"
          className={`absolute bottom-full mb-2 z-[9999] px-2.5 py-1 bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 rounded-lg shadow-2xl whitespace-nowrap pointer-events-none select-none flex flex-col items-center gap-0.5 text-xs animate-in fade-in zoom-in-95 duration-100 ${tooltipClass}`}
        >
          {romaji && <span className="font-mono text-sky-400 font-bold">{romaji}</span>}
          {meaning && <span className="text-[11px] text-slate-300 font-sans">{meaning}</span>}
          {/* Tooltip Arrow */}
          <span
            className={`absolute top-full -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800 pointer-events-none ${arrowClass}`}
          />
        </span>
      )}
    </span>
  );
};
