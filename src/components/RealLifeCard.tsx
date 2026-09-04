import React from 'react';
import type { RealLifeContext } from '../types';
import { AutoJapanese } from './AutoJapanese';

export const RealLifeCard: React.FC<{ context: RealLifeContext }> = ({ context }) => {
  if (!context) return null;

  return (
    <div className="my-4 p-4 rounded-xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-950/20 text-slate-800 dark:text-slate-200 overflow-visible">
      {/* Badge & Why */}
      <div className="flex flex-wrap items-center gap-2 mb-2 overflow-visible">
        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 shrink-0">
          💡 {context.badge || 'Wofür im Alltag?'}
        </span>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 overflow-visible">
          <AutoJapanese text={context.why} />
        </span>
      </div>

      {/* When / Use-Case List */}
      <div className="mt-3 space-y-1.5 text-xs overflow-visible">
        <div className="font-medium text-slate-600 dark:text-slate-400">Wann du es benutzt:</div>
        <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 overflow-visible">
          {context.when.map((item, idx) => (
            <li key={idx} className="flex items-start gap-1.5 overflow-visible">
              <span className="text-sky-500 font-bold select-none">•</span>
              <span className="leading-relaxed overflow-visible">
                <AutoJapanese text={item} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Signal Words */}
      {context.signalWords && context.signalWords.length > 0 && (
        <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/60 flex flex-wrap items-center gap-2 text-xs overflow-visible">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Typische Signalwörter:</span>
          {context.signalWords.map((word, idx) => (
            <span
              key={idx}
              className="relative inline-flex items-center px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sky-600 dark:text-sky-400 font-medium overflow-visible shadow-2xs"
            >
              <AutoJapanese text={word} />
            </span>
          ))}
        </div>
      )}

      {/* Quick Tip / Eselsbrücke */}
      <div className="mt-2.5 text-xs text-slate-500 dark:text-slate-400 italic overflow-visible">
        ⚡ Merksatz: <AutoJapanese text={context.quickTip} />
      </div>
    </div>
  );
};
