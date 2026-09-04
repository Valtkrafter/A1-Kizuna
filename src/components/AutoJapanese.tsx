import React from 'react';
import { tokenizeJapanese } from '../utils/tokenizer';
import { HoverWord } from './HoverWord';

export { HoverWord } from './HoverWord';

export const AutoJapanese: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  // Handle Markdown bold (**...**) and italic (*...*)
  const mdRegex = /(\*\*.*?\*\*|\*[^*]+?\*)/g;
  if (mdRegex.test(text)) {
    const parts = text.split(mdRegex);
    return (
      <span className="inline overflow-visible">
        {parts.map((part, index) => {
          if (!part) return null;
          if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
            return (
              <strong key={index} className="font-bold text-slate-900 dark:text-slate-100 overflow-visible">
                <AutoJapanese text={part.slice(2, -2)} />
              </strong>
            );
          }
          if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
            return (
              <em key={index} className="italic text-slate-900 dark:text-slate-100 overflow-visible">
                <AutoJapanese text={part.slice(1, -1)} />
              </em>
            );
          }
          return <AutoJapanese key={index} text={part} />;
        })}
      </span>
    );
  }

  const tokens = tokenizeJapanese(text);

  return (
    <span className="inline-flex flex-wrap items-baseline gap-y-1 overflow-visible">
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
            <span key={index} className="text-slate-500 dark:text-slate-400 whitespace-pre mx-0.5">
              {token.text}
            </span>
          );
        }

        // Japanese tokens receive HoverWord with consistent dotted underline
        const isJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(token.text);
        if (isJapanese) {
          return <HoverWord key={index} word={token.text} />;
        }

        // Latin / non-Japanese words render as regular text
        return <span key={index} className="overflow-visible">{token.text}</span>;
      })}
    </span>
  );
};
