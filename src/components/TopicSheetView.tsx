import React, { useState } from 'react';
import { CheckCircle2, Play, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import type { GrammarTopicSheet } from '../types';
import { HoverKana } from './HoverKana';
import { SubRuleDrillRunner } from './SubRuleDrillRunner';
import { AudioButton } from './AudioButton';
import { AutoJapanese } from './AutoJapanese';
import { RealLifeCard } from './RealLifeCard';

interface TopicSheetViewProps {
  sheet: GrammarTopicSheet;
  passedSubRuleIds: string[];
  onSubRulePass: (subRuleId: string, score: number, total: number) => void;
}

export const TopicSheetView: React.FC<TopicSheetViewProps> = ({
  sheet,
  passedSubRuleIds,
  onSubRulePass,
}) => {
  const [activeDrillRuleId, setActiveDrillRuleId] = useState<string | null>(null);
  const [collapsedRuleIds, setCollapsedRuleIds] = useState<Record<string, boolean>>({});

  const totalSubRules = sheet.subRules.length;
  const passedCount = sheet.subRules.filter((sr) =>
    passedSubRuleIds.includes(sr.id)
  ).length;

  const masteryPct =
    totalSubRules > 0 ? Math.round((passedCount / totalSubRules) * 100) : 0;

  let statusText = 'Noch nicht begonnen';
  let statusColor = 'text-slate-500 dark:text-slate-400';
  if (masteryPct === 100) {
    statusText = '100 % sicher • Gemeistert';
    statusColor = 'text-emerald-700 dark:text-emerald-300';
  } else if (masteryPct >= 75) {
    statusText = `${masteryPct} % sicher • Stark`;
    statusColor = 'text-blue-700 dark:text-blue-300';
  } else if (masteryPct > 0) {
    statusText = `${masteryPct} % sicher • Im Aufbau`;
    statusColor = 'text-amber-700 dark:text-amber-300';
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="text-xs font-bold font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500">
              SO WEIT BIST DU SCHON
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
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${masteryPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span>{sheet.description}</span>
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
                    <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
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
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>
                          {isPassed
                            ? `5 Übungssätze wiederholen`
                            : `5 Übungssätze zu ${subRule.title.split('.')[1] || subRule.title} starten`}
                        </span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-2">
                      <SubRuleDrillRunner
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
    </div>
  );
};
