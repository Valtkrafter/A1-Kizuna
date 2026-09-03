import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Check } from 'lucide-react';
import type { SubRule, SubRuleTask } from '../types';
import { sound } from '../utils/sound';
import { AudioButton } from './AudioButton';
import { AutoJapanese } from './AutoJapanese';

interface SubRuleDrillRunnerProps {
  subRule: SubRule;
  onClose: () => void;
  onComplete: (passed: boolean, score: number, total: number) => void;
}

export const SubRuleDrillRunner: React.FC<SubRuleDrillRunnerProps> = ({
  subRule,
  onClose,
  onComplete,
}) => {
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [placedChips, setPlacedChips] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [slideKey, setSlideKey] = useState<number>(0);

  const tasks: SubRuleTask[] = subRule.tasks;
  const currentTask: SubRuleTask | undefined = tasks[taskIndex];
  const totalTasks = tasks.length;

  // Available chips for order task (chips that are not yet placed)
  const availableChips = React.useMemo(() => {
    if (!currentTask || currentTask.type !== 'order' || !currentTask.orderChips) {
      return [];
    }
    // Count occurrences placed vs available
    const placedCounts: Record<string, number> = {};
    placedChips.forEach((c) => {
      placedCounts[c] = (placedCounts[c] || 0) + 1;
    });

    const result: string[] = [];
    currentTask.orderChips.forEach((chip) => {
      if (placedCounts[chip] && placedCounts[chip] > 0) {
        placedCounts[chip]--;
      } else {
        result.push(chip);
      }
    });
    return result;
  }, [currentTask, placedChips]);

  // Is current answer correct?
  const isCorrect = React.useMemo(() => {
    if (!currentTask) return false;
    if (currentTask.type === 'cloze') {
      return selectedOption === currentTask.correctAnswer;
    }
    if (currentTask.type === 'order') {
      const assembled = placedChips.join(' ').trim();
      const target = currentTask.correctAnswer.trim();
      const assembledNoSpace = placedChips.join('').trim();
      const targetNoSpace = target.replace(/\s+/g, '');
      return assembled === target || assembledNoSpace === targetNoSpace;
    }
    return false;
  }, [currentTask, selectedOption, placedChips]);

  // Handle checking
  const handleCheck = useCallback(() => {
    if (isChecked || !currentTask) return;

    // Check if user provided an answer
    if (currentTask.type === 'cloze' && selectedOption === null) return;
    if (currentTask.type === 'order' && placedChips.length === 0) return;

    setIsChecked(true);

    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playError();
    }
  }, [isChecked, currentTask, selectedOption, placedChips, isCorrect]);

  // Handle advancing to the next sentence
  const handleNext = useCallback(() => {
    if (!isChecked) return;

    if (taskIndex + 1 < totalTasks) {
      sound.playKeypress();
      setTaskIndex((prev) => prev + 1);
      setSelectedOption(null);
      setPlacedChips([]);
      setIsChecked(false);
      setSlideKey((prev) => prev + 1);
    } else {
      // Finished all 5 sentences
      const finalScore = isCorrect ? correctCount + 1 : correctCount;
      const passed = finalScore >= 4;

      if (passed) {
        sound.playFinish();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#10b981', '#f59e0b'],
        });
      }

      setIsFinished(true);
      onComplete(passed, finalScore, totalTasks);
    }
  }, [isChecked, taskIndex, totalTasks, isCorrect, correctCount, onComplete]);

  // Keyboard navigation: 1-4 for cloze, Enter to check / advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return;

      const key = e.key;
      if (!isChecked) {
        if (currentTask?.type === 'cloze' && currentTask.options) {
          if (key === '1' && currentTask.options[0]) {
            setSelectedOption(currentTask.options[0]);
            sound.playKeypress();
          } else if (key === '2' && currentTask.options[1]) {
            setSelectedOption(currentTask.options[1]);
            sound.playKeypress();
          } else if (key === '3' && currentTask.options[2]) {
            setSelectedOption(currentTask.options[2]);
            sound.playKeypress();
          } else if (key === '4' && currentTask.options[3]) {
            setSelectedOption(currentTask.options[3]);
            sound.playKeypress();
          }
        }

        if (key === 'Enter') {
          const hasAnswer =
            (currentTask?.type === 'cloze' && selectedOption !== null) ||
            (currentTask?.type === 'order' && placedChips.length > 0);
          if (hasAnswer) {
            e.preventDefault();
            handleCheck();
          }
        }
      } else {
        if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChecked, isFinished, currentTask, selectedOption, placedChips, handleCheck, handleNext]);

  // Summary finish screen
  if (isFinished) {
    const passed = correctCount >= 4;
    return (
      <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-center animate-slide-in">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
            passed
              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
          {passed ? 'Form gemeistert' : 'Übung beendet'}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {subRule.title} • {correctCount} von {totalTasks} Sätzen richtig
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setTaskIndex(0);
              setSelectedOption(null);
              setPlacedChips([]);
              setIsChecked(false);
              setCorrectCount(0);
              setIsFinished(false);
              setSlideKey((prev) => prev + 1);
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 active:translate-y-0.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Nochmal üben</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 active:translate-y-0.5 transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Zurück zum Spickzettel</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentTask) return null;

  const progressPct = Math.round(((taskIndex + 1) / totalTasks) * 100);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 transition-colors">
      {/* Top Exercise Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
            Satz {taskIndex + 1} / {totalTasks}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
            {currentTask.type === 'cloze' ? 'Lückentext' : 'Satzbau-Puzzle'}
          </span>
        </div>

        {/* Mini progress track */}
        <div className="w-28 sm:w-36 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Animated Exercise Question Container */}
      <div key={slideKey} className="animate-slide-in">
        {/* German translation clue */}
        <div className="text-center mb-4">
          <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
            "{currentTask.translation}"
          </p>
        </div>

        {/* 1. CLOZE QUESTION VIEW */}
        {currentTask.type === 'cloze' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 text-center relative overflow-visible">
              <div className="text-2xl sm:text-3xl font-['Noto_Sans_JP'] font-medium text-slate-900 dark:text-slate-100 pr-8">
                {currentTask.prompt.includes('___') ? (
                  <>
                    <AutoJapanese text={currentTask.prompt.split('___')[0]} />
                    <span
                      className={`border-b-2 px-3 py-0.5 mx-1 font-bold rounded transition-colors inline-block ${
                        selectedOption !== null
                          ? isChecked
                            ? isCorrect
                              ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : 'border-rose-600 bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 line-through'
                            : 'border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'border-slate-400 dark:border-slate-600 text-slate-400'
                      }`}
                    >
                      {selectedOption ? <AutoJapanese text={selectedOption} /> : '______'}
                    </span>
                    <AutoJapanese text={currentTask.prompt.split('___')[1]} />
                  </>
                ) : (
                  <AutoJapanese text={currentTask.prompt} />
                )}
              </div>

              {/* Speaker button on prompt card */}
              <AudioButton
                text={
                  currentTask.prompt.includes('___')
                    ? currentTask.prompt.replace(
                        '___',
                        selectedOption || currentTask.correctAnswer
                      )
                    : currentTask.prompt
                }
                className="absolute top-3 right-3"
              />
            </div>

            {/* Options 1-4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTask.options?.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isCorrectOption = opt === currentTask.correctAnswer;

                let cardStyle =
                  'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-700';
                let badgeStyle =
                  'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700';

                if (isSelected && !isChecked) {
                  cardStyle =
                    'border-2 border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100';
                  badgeStyle = 'bg-blue-600 text-white border-blue-600';
                }

                if (isChecked) {
                  if (isCorrectOption) {
                    cardStyle =
                      'border-2 border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100';
                    badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                  } else if (isSelected && !isCorrect) {
                    cardStyle =
                      'border-2 border-rose-600 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                    badgeStyle = 'bg-rose-600 text-white border-rose-600';
                  } else {
                    cardStyle =
                      'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isChecked}
                    onClick={() => {
                      setSelectedOption(opt);
                      sound.playKeypress();
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl text-left font-medium active:translate-y-0.5 transition overflow-visible ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-md text-xs font-mono font-bold transition shrink-0 ${badgeStyle}`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-lg font-['Noto_Sans_JP'] tracking-wide">
                        <AutoJapanese text={opt} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. ORDER (SATZBAU-PUZZLE) VIEW */}
        {currentTask.type === 'order' && (
          <div className="space-y-6">
            {/* Placed Chips Slot Area */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 min-h-[90px] flex items-center justify-center flex-wrap gap-2.5 relative">
              {placedChips.length === 0 ? (
                <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                  Tippe auf die Wörter unten, um den Satz zu bauen
                </span>
              ) : (
                placedChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={isChecked}
                    onClick={() => {
                      // Remove chip and return to available pool
                      setPlacedChips((prev) => prev.filter((_, i) => i !== idx));
                      sound.playKeypress();
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100 font-['Noto_Sans_JP'] font-medium text-base sm:text-lg animate-chip-pop hover:bg-rose-50 dark:hover:bg-rose-950 hover:border-rose-300 active:translate-y-0.5 transition cursor-pointer overflow-visible"
                    title="Antippen zum Entfernen"
                  >
                    <AutoJapanese text={chip} />
                  </button>
                ))
              )}

              {/* Speaker button to hear target sentence */}
              <AudioButton
                text={
                  placedChips.length > 0
                    ? placedChips.join(' ')
                    : currentTask.correctAnswer
                }
                className="absolute top-2 right-2"
              />
            </div>

            {/* Available Chips Pool */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              {availableChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isChecked}
                  onClick={() => {
                    setPlacedChips((prev) => [...prev, chip]);
                    sound.playKeypress();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-['Noto_Sans_JP'] font-medium text-base sm:text-lg hover:border-slate-400 dark:hover:border-slate-500 active:translate-y-0.5 transition cursor-pointer overflow-visible"
                >
                  <AutoJapanese text={chip} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Spring Feedback Drawer */}
      <div
        className={`mt-6 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 sm:p-5 border-t rounded-b-2xl transition-colors ${
          isChecked
            ? isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 animate-spring-up'
              : 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800 animate-spring-up'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {isChecked ? (
            <div className="flex items-start gap-3 w-full sm:w-auto">
              <div
                className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                  isCorrect
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <div
                  className={`font-bold text-base ${
                    isCorrect
                      ? 'text-emerald-900 dark:text-emerald-100'
                      : 'text-rose-900 dark:text-rose-100'
                  }`}
                >
                  {isCorrect ? 'Ausgezeichnet!' : 'Nicht ganz richtig'}
                </div>
                {!isCorrect && (
                  <div className="text-xs text-rose-800 dark:text-rose-200 font-medium mt-0.5">
                    Lösung: <span className="font-bold"><AutoJapanese text={currentTask.correctAnswer} /></span>
                  </div>
                )}
                <p
                  className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                    isCorrect
                      ? 'text-emerald-800 dark:text-emerald-200'
                      : 'text-rose-800 dark:text-rose-200'
                  }`}
                >
                  <AutoJapanese text={currentTask.explanation} />
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 dark:text-slate-500 font-mono hidden sm:block">
              Drücke Enter ↵ zum Prüfen
            </div>
          )}

          <div className="w-full sm:w-auto shrink-0 flex justify-end">
            {!isChecked ? (
              <button
                type="button"
                disabled={
                  (currentTask.type === 'cloze' && selectedOption === null) ||
                  (currentTask.type === 'order' && placedChips.length === 0)
                }
                onClick={handleCheck}
                className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs tracking-wide active:translate-y-0.5 transition ${
                  (currentTask.type === 'cloze' && selectedOption !== null) ||
                  (currentTask.type === 'order' && placedChips.length > 0)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                Überprüfen
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={`w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 active:translate-y-0.5 transition ${
                  isCorrect
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                <span>Weiter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
