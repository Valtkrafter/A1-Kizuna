import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TopicSheetView } from './components/TopicSheetView';
import { Dashboard } from './components/Dashboard';
import { SYLLABUS } from './data/syllabus';
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
  const [activeSheetId, setActiveSheetId] = useState<string>('mod-1');
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

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
    setActiveSheetId('mod-1');
    setIsDashboardOpen(true);
  };

  const handleSubRulePass = (subRuleId: string, score: number, total: number) => {
    const updated = markSubRulePassed(subRuleId, score, total);
    setProgress(updated);
  };

  const currentSheetIndex = SYLLABUS.findIndex((s) => s.id === activeSheetId);
  const currentSheet =
    currentSheetIndex >= 0 ? SYLLABUS[currentSheetIndex] : SYLLABUS[0];

  const hasNextModule = currentSheetIndex < SYLLABUS.length - 1;
  const nextModule = hasNextModule ? SYLLABUS[currentSheetIndex + 1] : null;

  const handleSelectModule = (moduleId: string) => {
    setActiveSheetId(moduleId);
    setIsDashboardOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextModule = () => {
    if (nextModule) {
      handleSelectModule(nextModule.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        sheets={SYLLABUS}
        activeSheetId={activeSheetId}
        isDashboardOpen={isDashboardOpen}
        onOpenDashboard={() => setIsDashboardOpen(true)}
        onSelectSheet={handleSelectModule}
        passedSubRuleIds={progress.passedSubRuleIds}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        soundEnabled={progress.soundEnabled}
        onToggleSound={handleToggleSound}
        onResetProgress={handleResetProgress}
      />

      <main className="flex-1 pb-16">
        {isDashboardOpen ? (
          <Dashboard
            modules={SYLLABUS}
            passedSubRuleIds={progress.passedSubRuleIds}
            onSelectModule={handleSelectModule}
          />
        ) : (
          <TopicSheetView
            key={currentSheet.id}
            sheet={currentSheet}
            passedSubRuleIds={progress.passedSubRuleIds}
            onSubRulePass={handleSubRulePass}
            onBackToDashboard={() => setIsDashboardOpen(true)}
            onNextModule={handleNextModule}
            hasNextModule={hasNextModule}
          />
        )}
      </main>
    </div>
  );
}

export default App;
