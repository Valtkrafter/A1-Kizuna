import React from 'react';
import { Volume2, VolumeX, RotateCcw, Sun, Moon, ChevronDown } from 'lucide-react';
import type { ThemeMode, GrammarTopicSheet } from '../types';

interface NavbarProps {
  sheets: GrammarTopicSheet[];
  activeSheetId: string;
  onSelectSheet: (sheetId: string) => void;
  passedSubRuleIds: string[];
  theme: ThemeMode;
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetProgress: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  sheets,
  activeSheetId,
  onSelectSheet,
  passedSubRuleIds,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onResetProgress,
}) => {
  const totalSubRules = sheets.reduce((sum, s) => sum + s.subRules.length, 0);
  const totalPassed = passedSubRuleIds.length;
  const overallPercentage =
    totalSubRules > 0 ? Math.round((totalPassed / totalSubRules) * 100) : 0;

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Brand & Topic Switcher */}
        <div className="flex items-center justify-between sm:justify-start gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              絆
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 dark:text-slate-100 tracking-tight text-base">
                  A1 Kizuna
                </span>
                <span className="text-[10px] font-semibold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                  Spickzettel
                </span>
              </div>
            </div>
          </div>

          {/* Topic Sheet Selector Dropdown */}
          <div className="relative">
            <select
              value={activeSheetId}
              onChange={(e) => onSelectSheet(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-xs py-1.5 pl-3 pr-8 rounded-lg cursor-pointer hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              {sheets.map((sheet) => (
                <option key={sheet.id} value={sheet.id}>
                  {sheet.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Global Progress & Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
          {/* Mini overall mastery bar */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span>A1 Lehrplan:</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {overallPercentage}%
            </span>
            <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
              <div
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${overallPercentage}%` }}
              />
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 active:translate-y-0.5 transition"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Hell</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                <span className="hidden sm:inline">Dunkel</span>
              </>
            )}
          </button>

          {/* Sound toggle */}
          <button
            onClick={onToggleSound}
            title="Ton ein- oder ausschalten"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border active:translate-y-0.5 transition ${
              soundEnabled
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Ton an' : 'Stumm'}</span>
          </button>

          {/* Reset progress */}
          {totalPassed > 0 && (
            <button
              onClick={() => {
                if (window.confirm('Möchtest du deinen Lernfortschritt wirklich zurücksetzen?')) {
                  onResetProgress();
                }
              }}
              title="Fortschritt zurücksetzen"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg active:translate-y-0.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
