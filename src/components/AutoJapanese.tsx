import React, { useState, useRef, useEffect } from 'react';
import { A1_DICTIONARY } from '../data/dictionary';

// 1. Universal Hiragana/Katakana to Romaji converter (Fallback for single kana or unlisted words)
const KANA_TO_ROMAJI: Record<string, string> = {
  // Hiragana
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'o', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'dzu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ゃ: 'ya', ゅ: 'yu', ょ: 'yo', っ: '',
  // Katakana
  ア: 'a', イ: 'i', ウ: 'u', エ: 'e', オ: 'o',
  カ: 'ka', キ: 'ki', ク: 'ku', ケ: 'ke', コ: 'ko',
  サ: 'sa', シ: 'shi', ス: 'su', セ: 'se', ソ: 'so',
  タ: 'ta', チ: 'chi', ツ: 'tsu', テ: 'te', ト: 'to',
  ナ: 'na', ニ: 'ni', ヌ: 'nu', ネ: 'ne', ノ: 'no',
  ハ: 'ha', ヒ: 'hi', フ: 'fu', ヘ: 'he', ホ: 'ho',
  マ: 'ma', ミ: 'mi', ム: 'mu', メ: 'me', モ: 'mo',
  ヤ: 'ya', ユ: 'yu', ヨ: 'yo',
  ラ: 'ra', リ: 'ri', ル: 'ru', レ: 're', ロ: 'ro',
  ワ: 'wa', ヲ: 'o', ン: 'n',
  ガ: 'ga', ギ: 'gi', グ: 'gu', ゲ: 'ge', ゴ: 'go',
  ザ: 'za', ジ: 'ji', ズ: 'zu', ゼ: 'ze', ゾ: 'zo',
  ダ: 'da', ヂ: 'ji', ヅ: 'dzu', デ: 'de', ド: 'do',
  バ: 'ba', ビ: 'bi', ブ: 'bu', ベ: 'be', ボ: 'bo',
  パ: 'pa', ピ: 'pi', プ: 'pu', ペ: 'pe', ポ: 'po',
  ャ: 'ya', ュ: 'yu', ョ: 'yo', ッ: '',
  ー: '-',
  // Common multi-kana words
  パン: 'pan', バス: 'basu', タクシー: 'takushii'
};

function kanaToRomaji(kana: string): string {
  let romaji = '';
  for (let i = 0; i < kana.length; i++) {
    const char = kana[i];
    romaji += KANA_TO_ROMAJI[char] || char;
  }
  return romaji;
}

// 2. Interactive Word Component with Tooltip
export const HoverWord: React.FC<{ word: string }> = ({ word }) => {
  const [open, setOpen] = useState(false);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const spanRef = useRef<HTMLSpanElement>(null);

  const updateAlignment = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      if (rect.left < 100) {
        setAlign('left');
      } else if (window.innerWidth - rect.right < 100) {
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

  // Strip tildes or brackets if present for lookup
  const cleanWord = word.replace(/[〜~「」()（）*]/g, '').trim();
  const dictEntry = A1_DICTIONARY[cleanWord] || A1_DICTIONARY[word];

  const romaji = dictEntry?.romaji || kanaToRomaji(cleanWord);
  const meaning = dictEntry?.de || '';

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
      className="relative inline-block cursor-pointer align-baseline"
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
      <span className="underline decoration-dotted decoration-sky-400 dark:decoration-sky-500 underline-offset-4 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
        {word}
      </span>

      {open && (
        <span
          role="tooltip"
          className={`absolute bottom-full mb-2.5 z-50 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white border border-slate-700 rounded-lg shadow-2xl whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5 text-xs animate-tooltip-pop ${tooltipClass}`}
        >
          <span className="font-mono text-sky-400 font-bold text-xs">{romaji}</span>
          {meaning && <span className="text-[11px] text-slate-300 font-sans">{meaning}</span>}
          <span
            className={`absolute top-full -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800 ${arrowClass}`}
          />
        </span>
      )}
    </span>
  );
};

// 3. Universal Text Parser: Splits ANY string into plain text & interactive Japanese spans
export const AutoJapanese: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Splits markdown bold (**...**), italic (*...*), cloze blanks (_{2,}), and Japanese segments
  const regex = /(\*\*.*?\*\*|\*[^*]+?\*|_{2,}|[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3000-\u303F〜]+)/g;
  const parts = text.split(regex);

  return (
    <span className="inline">
      {parts.map((part, index) => {
        if (!part) return null;

        // Bold markdown
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          const inner = part.slice(2, -2);
          return (
            <strong key={index} className="text-slate-900 dark:text-slate-100 font-bold">
              <AutoJapanese text={inner} />
            </strong>
          );
        }

        // Italic markdown
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
          const inner = part.slice(1, -1);
          return (
            <em key={index} className="italic text-slate-900 dark:text-slate-100">
              <AutoJapanese text={inner} />
            </em>
          );
        }

        // Render exercise blank
        if (part.startsWith('__')) {
          return (
            <span
              key={index}
              className="inline-block min-w-[70px] border-b-2 border-slate-400 dark:border-slate-500 mx-1.5 text-center font-mono text-sky-400"
            >
              _____
            </span>
          );
        }

        // Check if segment contains Japanese characters
        const isJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF〜]/.test(part);

        if (isJapanese) {
          return <HoverWord key={index} word={part} />;
        }

        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
