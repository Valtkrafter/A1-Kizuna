import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TopicSheetView } from './components/TopicSheetView';
import { GRAMMAR_SHEETS } from './data/grammarSheets';
import type { ThemeMode, SheetProgressData } from './types';
import {
  loadTheme,
  saveTheme,
  loadSheetProgress,
  markSubRulePassed,
  resetSheetProgress,
  saveSheetProgress,
} from './utils/storage';
import { sound } from './utils/sound';

export function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => loadTheme());
  const [progress, setProgress] = useState<SheetProgressData>(() =>
    loadSheetProgress()
  );
  const [activeSheetId, setActiveSheetId] = useState<string>('sheet-masu');

  // Sync dark class on document root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    saveTheme(theme);
  }, [theme]);

  // Sync sound engine
  useEffect(() => {
    sound.enabled = progress.soundEnabled;
  }, [progress.soundEnabled]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleSound = () => {
    setProgress((prev) => {
      const updated = { ...prev, soundEnabled: !prev.soundEnabled };
      saveSheetProgress(updated);
      return updated;
    });
  };

  const handleResetProgress = () => {
    const fresh = resetSheetProgress();
    setProgress(fresh);
  };

  const handleSubRulePass = (subRuleId: string, score: number, total: number) => {
    const updated = markSubRulePassed(subRuleId, score, total);
    setProgress(updated);
  };

  const currentSheet =
    GRAMMAR_SHEETS.find((s) => s.id === activeSheetId) || GRAMMAR_SHEETS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        sheets={GRAMMAR_SHEETS}
        activeSheetId={activeSheetId}
        onSelectSheet={(id) => {
          setActiveSheetId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        passedSubRuleIds={progress.passedSubRuleIds}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        onResetProgress={handleResetProgress}
      />

      <main className="flex-1 pb-16">
        <TopicSheetView
          key={currentSheet.id}
          sheet={currentSheet}
          passedSubRuleIds={progress.passedSubRuleIds}
          onSubRulePass={handleSubRulePass}
        />
      </main>
    </div>
  );
}

export default App;
