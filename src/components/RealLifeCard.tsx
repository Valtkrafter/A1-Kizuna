import React from 'react';
import type { RealLifeContext } from '../types';
import { AutoJapanese } from './AutoJapanese';

export const RealLifeCard: React.FC<{ context: RealLifeContext }> = ({ context }) => {
  if (!context) return null;

  return (
    <div className="my-4 p-4 rounded-xl border border-sky-500/30 bg-sky-500/5 dark:bg-sky-950/20 text-slate-800 dark:text-slate-200">
      <div className="flex flex-wrap items-center gap-2 mb-2.5">
        <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-300 shrink-0">
          💡 {context.badge || 'Wofür im Alltag?'}
        </span>
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{context.why}</span>
      </div>

      <div className="mt-2 space-y-1.5 text-xs">
        <div className="font-medium text-slate-600 dark:text-slate-400">Wann du es benutzt:</div>
        <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
          {context.when.map((item, idx) => (
            <li key={idx} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      </div>

      {context.signalWords && context.signalWords.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Typische Signalwörter:</span>
          {context.signalWords.map((word, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sky-600 dark:text-sky-400 font-semibold shadow-2xs"
            >
              <AutoJapanese text={word} />
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 italic">
        ⚡ Merksatz: {context.quickTip}
      </div>
    </div>
  );
};
