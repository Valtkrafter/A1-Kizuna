import React from 'react';
import type { RealLifeContext } from '../types';
import { AutoJapanese } from './AutoJapanese';

export const RealLifeCard: React.FC<{ context: RealLifeContext }> = ({ context }) => {
  if (!context) return null;

  return (
    <div className="my-4 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 overflow-visible transition-colors">
      {/* Badge & Why (Keine Emojis in Überschriften / Badges) */}
      <div className="flex flex-wrap items-center gap-2.5 mb-3 overflow-visible">
        <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shrink-0">
          {context.badge || 'Alltags-Kontext'}
        </span>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 overflow-visible">
          <AutoJapanese text={context.why} />
        </span>
      </div>

      {/* When / Use-Case List */}
      <div className="mt-3 space-y-2 text-xs overflow-visible">
        <div className="font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[11px] font-mono">
          Wann du es benutzt:
        </div>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 overflow-visible">
          {context.when.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 overflow-visible">
              <span className="text-slate-400 dark:text-slate-500 font-bold select-none">•</span>
              <span className="leading-relaxed overflow-visible">
                <AutoJapanese text={item} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Signal Words */}
      {context.signalWords && context.signalWords.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs overflow-visible">
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px] font-semibold uppercase">
            Signalwörter:
          </span>
          {context.signalWords.map((word, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium overflow-visible"
            >
              <AutoJapanese text={word} />
            </span>
          ))}
        </div>
      )}

      {/* Quick Tip / Eselsbrücke */}
      <div className="mt-3 pt-2 text-xs text-slate-600 dark:text-slate-400 overflow-visible font-sans">
        <span className="font-semibold text-slate-800 dark:text-slate-200">Merksatz:</span>{' '}
        <AutoJapanese text={context.quickTip} />
      </div>
    </div>
  );
};
