import React, { useState } from 'react';
import { CheckCircle2, Play, ChevronDown, ChevronUp, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import type { TopicModule } from '../types';
import { HoverKana } from './HoverKana';
import { SubRuleDrillRunner } from './SubRuleDrillRunner';
import { AudioButton } from './AudioButton';
import { AutoJapanese } from './AutoJapanese';
import { RealLifeCard } from './RealLifeCard';

interface TopicSheetViewProps {
  sheet: TopicModule;
  passedSubRuleIds: string[];
  onSubRulePass: (subRuleId: string, score: number, total: number) => void;
  onBackToDashboard?: () => void;
  onNextModule?: () => void;
  hasNextModule?: boolean;
}

export const TopicSheetView: React.FC<TopicSheetViewProps> = ({
  sheet,
  passedSubRuleIds,
  onSubRulePass,
  onBackToDashboard,
  onNextModule,
  hasNextModule,
}) => {
  const [activeDrillRuleId, setActiveDrillRuleId] = useState<string | null>(null);
  const [collapsedRuleIds, setCollapsedRuleIds] = useState<Record<string, boolean>>({});

  const totalSubRules = sheet.subRules.length;
  const passedCount = sheet.subRules.filter((sr) =>
    passedSubRuleIds.includes(sr.id)
  ).length;

  const masteryPct =
    totalSubRules > 0 ? Math.round((passedCount / totalSubRules) * 100) : 0;
  const isModuleMastered = passedCount === totalSubRules;

  let statusText = 'Noch nicht begonnen';
  let statusColor = 'text-slate-500 dark:text-slate-400';
  if (masteryPct === 100) {
    statusText = '100 % sicher • Gemeistert';
    statusColor = 'text-emerald-700 dark:text-emerald-400';
  } else if (masteryPct >= 75) {
    statusText = `${masteryPct} % sicher • Stark`;
    statusColor = 'text-slate-800 dark:text-slate-200';
  } else if (masteryPct > 0) {
    statusText = `${masteryPct} % sicher • Im Aufbau`;
    statusColor = 'text-slate-700 dark:text-slate-300';
  }

  const toggleCollapse = (ruleId: string) => {
    setCollapsedRuleIds((prev) => ({
      ...prev,
      [ruleId]: !prev[ruleId],
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Mastery Indicator: "SO WEIT BIST DU SCHON" */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 transition-colors">
        {onBackToDashboard && (
          <button
            type="button"
            onClick={onBackToDashboard}
            className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition active:translate-y-0.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Zurück zum Dashboard</span>
          </button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
              MODUL-STATUS
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
              {sheet.title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold font-mono px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${statusColor}`}
            >
              {statusText}
            </span>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
          <div
            className="h-full bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${masteryPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>{sheet.category} • {sheet.subRules.length} Lerneinheiten</span>
          <span className="font-mono font-medium">
            {passedCount} / {totalSubRules} Formen gemeistert
          </span>
        </div>
      </div>

      {/* Spickzettel Card Flow */}
      <div className="space-y-6">
        {sheet.subRules.map((subRule) => {
          const isPassed = passedSubRuleIds.includes(subRule.id);
          const isDrillOpen = activeDrillRuleId === subRule.id;
          const isCollapsed = collapsedRuleIds[subRule.id] && !isDrillOpen;

          return (
            <div
              key={subRule.id}
              id={`rule-${subRule.id}`}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 transition-all duration-200 overflow-visible"
            >
              {/* Sub-Rule Header */}
              <div
                onClick={() => toggleCollapse(subRule.id)}
                className={`p-5 sm:px-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 rounded-t-2xl ${
                  isCollapsed ? 'rounded-b-2xl' : ''
                } transition`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isPassed
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <BookOpen className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                        {subRule.title}
                      </h2>
                      {isPassed && (
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Gemeistert
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </div>
              </div>

              {/* Sub-Rule Body Content */}
              {!isCollapsed && (
                <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 dark:border-slate-800 space-y-5 overflow-visible">
                  {/* German Rule Explanation */}
                  <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 pt-3">
                    <p className="leading-relaxed">
                      <AutoJapanese text={subRule.explanation} />
                    </p>
                  </div>

                  {/* Formula Badge Box */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shrink-0">
                      =
                    </div>
                    <div className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <AutoJapanese text={subRule.formula} />
                    </div>
                  </div>

                  {/* Alltags-Einsatz Context Box */}
                  {subRule.realLifeContext && (
                    <RealLifeCard context={subRule.realLifeContext} />
                  )}

                  {/* Example Sentences Card with <HoverKana /> & Audio */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Beispielsätze (Hover für Romaji):
                    </div>

                    <div className="space-y-2.5">
                      {subRule.examples.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="flex items-start justify-between gap-3 p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        >
                          <div>
                            <div className="text-base sm:text-lg text-slate-900 dark:text-slate-100 font-medium font-['Noto_Sans_JP']">
                              <HoverKana
                                japanese={ex.japanese}
                                romaji={ex.romaji}
                                german={ex.german}
                              />
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              {ex.german}
                            </div>
                          </div>

                          <AudioButton text={ex.japanese} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5-Sentence Drill Toggle Button or Active Drill Runner */}
                  {!isDrillOpen ? (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setActiveDrillRuleId(subRule.id)}
                        className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:translate-y-0.5 transition ${
                          isPassed
                            ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                            : 'bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>
                          {isPassed
                            ? '5 Übungssätze wiederholen'
                            : `5 Übungssätze starten (${subRule.tasks.length} im Pool)`}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <SubRuleDrillRunner
                        key={subRule.id}
                        subRule={subRule}
                        onClose={() => setActiveDrillRuleId(null)}
                        onComplete={(passed, score, total) => {
                          if (passed) {
                            onSubRulePass(subRule.id, score, total);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Module Completion Footer */}
      {isModuleMastered && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                Modul gemeistert!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Alle Lerneinheiten dieses Moduls wurden erfolgreich abgeschlossen.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {onBackToDashboard && (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs active:translate-y-0.5 transition"
              >
                Dashboard
              </button>
            )}

            {hasNextModule && onNextModule && (
              <button
                type="button"
                onClick={onNextModule}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 active:translate-y-0.5 transition"
              >
                <span>Nächstes Modul</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
