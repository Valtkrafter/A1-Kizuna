import React, { useState, useRef, useEffect } from 'react';
import { A1_DICTIONARY } from '../data/dictionary';

// Pre-sort dictionary keys by length descending for longest-match-first lookup
const DICT_KEYS = Object.keys(A1_DICTIONARY).sort((a, b) => b.length - a.length);

export interface Token {
  text: string;
  isBlank: boolean;
  isPunctuation: boolean;
  isWord: boolean;
}

// Splits Japanese and mixed text into discrete words/particles using longest-match dictionary lookup
export function tokenizeSentence(text: string): Token[] {
  const tokens: Token[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    // 1. Check for Cloze Blanks (_____ or ___)
    const blankMatch = remaining.match(/^_{2,}/);
    if (blankMatch) {
      tokens.push({ text: blankMatch[0], isBlank: true, isPunctuation: false, isWord: false });
      remaining = remaining.slice(blankMatch[0].length);
      continue;
    }

    // 2. Check for Punctuation or Spaces (、, 。, ・, 「, 」, spaces, etc.)
    const punctMatch = remaining.match(/^[、。・「」『』\s!?！？,.]/);
    if (punctMatch) {
      tokens.push({ text: punctMatch[0], isBlank: false, isPunctuation: true, isWord: false });
      remaining = remaining.slice(punctMatch[0].length);
      continue;
    }

    // 3. Match Longest Dictionary Word
    let matched = false;
    for (const key of DICT_KEYS) {
      if (remaining.startsWith(key)) {
        tokens.push({ text: key, isBlank: false, isPunctuation: false, isWord: true });
        remaining = remaining.slice(key.length);
        matched = true;
        break;
      }
    }
    if (matched) continue;

    // 4. Check for Latin / German word chunks & symbols (so words like "Beim" or "[Ort]" stay intact)
    const latinMatch = remaining.match(/^[a-zA-Z0-9äöüÄÖÜß+→/—\-:()[\]~]+/);
    if (latinMatch) {
      tokens.push({ text: latinMatch[0], isBlank: false, isPunctuation: false, isWord: false });
      remaining = remaining.slice(latinMatch[0].length);
      continue;
    }

    // 5. Fallback: Take a single character so it NEVER clumps into giant blocks
    tokens.push({ text: remaining[0], isBlank: false, isPunctuation: false, isWord: false });
    remaining = remaining.slice(1);
  }

  return tokens;
}

export const HoverWord: React.FC<{ word: string }> = ({ word }) => {
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const spanRef = useRef<HTMLSpanElement>(null);

  const cleanWord = word.replace(/[〜~「」()（）*]/g, '').trim();
  const info = A1_DICTIONARY[word] || A1_DICTIONARY[cleanWord];

  // If no dictionary info, render clean text without broken tooltips
  if (!info) {
    return <span className="text-slate-800 dark:text-slate-100">{word}</span>;
  }

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

  // Mobile tap outside
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (spanRef.current && !spanRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

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
      className="relative inline-block cursor-pointer mx-[1px]"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={(e) => {
        e.stopPropagation();
        if (!open) {
          updateAlignment();
          setOpen(true);
        } else {
          setOpen(false);
        }
      }}
    >
      {/* Individual dotted underline per word */}
      <span className="underline decoration-dotted decoration-sky-400 dark:decoration-sky-500 underline-offset-4 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
        {word}
      </span>

      {open && (
        <span
          role="tooltip"
          className={`absolute bottom-full mb-2.5 z-50 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 rounded-lg shadow-xl whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5 text-xs animate-in fade-in zoom-in-95 duration-100 ${tooltipClass}`}
        >
          <span className="font-mono text-sky-400 font-bold text-xs">{info.romaji}</span>
          {info.de && <span className="text-[11px] text-slate-300 font-sans">{info.de}</span>}
          <span
            className={`absolute top-full -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800 ${arrowClass}`}
          />
        </span>
      )}
    </span>
  );
};

export const AutoJapanese: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Handle Markdown bold (**...**) and italic (*...*)
  const mdRegex = /(\*\*.*?\*\*|\*[^*]+?\*)/g;
  if (mdRegex.test(text)) {
    const parts = text.split(mdRegex);
    return (
      <span className="inline">
        {parts.map((part, index) => {
          if (!part) return null;
          if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
              <strong key={index} className="font-bold text-slate-900 dark:text-slate-100">
                <AutoJapanese text={part.slice(2, -2)} />
              </strong>
            );
          }
          if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
            return (
              <em key={index} className="italic text-slate-900 dark:text-slate-100">
                <AutoJapanese text={part.slice(1, -1)} />
              </em>
            );
          }
          return <AutoJapanese key={index} text={part} />;
        })}
      </span>
    );
  }

  const tokens = tokenizeSentence(text);

  return (
    <span className="inline-flex flex-wrap items-baseline gap-y-1">
      {tokens.map((token, index) => {
        if (token.isBlank) {
          return (
            <span
              key={index}
              className="inline-block min-w-[70px] border-b-2 border-slate-400 dark:border-slate-500 mx-2 text-center font-mono text-sky-400"
            >
              _____
            </span>
          );
        }

        if (token.isPunctuation) {
          return (
            <span key={index} className="text-slate-500 dark:text-slate-400 whitespace-pre">
              {token.text}
            </span>
          );
        }

        return <HoverWord key={index} word={token.text} />;
      })}
    </span>
  );
};
