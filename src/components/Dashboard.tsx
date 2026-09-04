import React from 'react';
import { CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import type { TopicModule } from '../types/curriculum';

interface DashboardProps {
  modules: TopicModule[];
  passedSubRuleIds: string[];
  onSelectModule: (moduleId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  modules,
  passedSubRuleIds,
  onSelectModule,
}) => {
  // Helper to determine lock status
  const isModuleUnlocked = (index: number): boolean => {
    if (index === 0) return true;
    const prevModule = modules[index - 1];
    if (!prevModule) return false;
    return prevModule.subRules.every((sr) => passedSubRuleIds.includes(sr.id));
  };

  const totalSubRules = modules.reduce((sum, m) => sum + m.subRules.length, 0);
  const totalPassed = passedSubRuleIds.length;
  const overallPercentage =
    totalSubRules > 0 ? Math.round((totalPassed / totalSubRules) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header & Overview Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
              A1-CURRICULUM (BUSUU-SYLLABUS 1–23)
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
              Curriculum Dashboard
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              13 strukturierte Module • 36 grammatische Lerneinheiten • Lineare Freischaltung
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-2xl font-bold font-mono text-slate-900 dark:text-slate-100">
                {overallPercentage}%
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {totalPassed} / {totalSubRules} gemeistert
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <div
            className="h-full bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod, index) => {
          const unlocked = isModuleUnlocked(index);
          const passedInModule = mod.subRules.filter((sr) =>
            passedSubRuleIds.includes(sr.id)
          ).length;
          const totalInModule = mod.subRules.length;
          const isCompleted = passedInModule === totalInModule;
          const modulePct = Math.round((passedInModule / totalInModule) * 100);

          return (
            <div
              key={mod.id}
              onClick={() => {
                if (unlocked) {
                  onSelectModule(mod.id);
                }
              }}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all duration-200 ${
                unlocked
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 cursor-pointer shadow-sm hover:shadow-md'
                  : 'bg-slate-100/70 dark:bg-slate-950/60 border-slate-200 dark:border-slate-900 opacity-70 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Category & Status Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase tracking-wider">
                    {mod.category}
                  </span>

                  {isCompleted ? (
                    <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Gemeistert
                    </span>
                  ) : unlocked ? (
                    <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {passedInModule} / {totalInModule}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold font-mono px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Gesperrt
                    </span>
                  )}
                </div>

                {/* Module Title (No emojis) */}
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-2">
                  {mod.title}
                </h2>

                {/* SubRules summary list */}
                <div className="space-y-1 my-3 text-xs text-slate-500 dark:text-slate-400">
                  {mod.subRules.map((sr) => {
                    const srPassed = passedSubRuleIds.includes(sr.id);
                    return (
                      <div key={sr.id} className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            srPassed
                              ? 'bg-emerald-500'
                              : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                        />
                        <span className="truncate">{sr.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                {unlocked ? (
                  <div className="space-y-3">
                    {/* Progress track */}
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-800 dark:bg-slate-200 rounded-full transition-all duration-300"
                        style={{ width: `${modulePct}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectModule(mod.id);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 active:translate-y-0.5 transition"
                    >
                      <span>
                        {isCompleted
                          ? 'Modul wiederholen'
                          : passedInModule > 0
                          ? 'Weiterlernen'
                          : 'Modul starten'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1.5 py-1">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>Schließe Modul {index} ab zum Freischalten</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
