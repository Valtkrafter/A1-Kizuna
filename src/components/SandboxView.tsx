import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SANDBOX_PROMPTS, type SandboxPrompt } from '../data/sandboxPrompts';
import {
  evaluateSandboxSentence,
  evaluateFreeSpeech,
  generateNewScenario,
  getActiveApiKey,
  saveLocalApiKey,
  type SandboxEvaluation,
  type FreeSpeechEvaluation,
  type DynamicScenario,
} from '../services/deepseek';
import { AutoJapanese } from './AutoJapanese';
import { AudioButton } from './AudioButton';
import { soundEffects } from '../utils/soundEffects';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from 'lucide-react';

type ScenarioItem = SandboxPrompt | DynamicScenario;

export const SandboxView: React.FC = () => {
  const [mode, setMode] = useState<'scenario' | 'free_speech'>('scenario');
  const [scenarios, setScenarios] = useState<ScenarioItem[]>(SANDBOX_PROMPTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatingScenario, setGeneratingScenario] = useState(false);
  const [evaluation, setEvaluation] = useState<SandboxEvaluation | null>(null);
  const [freeEvaluation, setFreeEvaluation] = useState<FreeSpeechEvaluation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>(() => getActiveApiKey());
  const [hasApiKey, setHasApiKey] = useState<boolean>(() => Boolean(getActiveApiKey()));

  const activePrompt = scenarios[currentIndex] || scenarios[0];
  const isAi = 'isAiGenerated' in activePrompt && Boolean(activePrompt.isAiGenerated);

  const handleSwitchMode = (newMode: 'scenario' | 'free_speech') => {
    soundEffects.playClick();
    setMode(newMode);
    setUserInput('');
    setError(null);
  };

  const handleNext = async () => {
    soundEffects.playClick();
    setUserInput('');
    setEvaluation(null);
    setError(null);

    // If there is an existing next scenario, navigate directly
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    // Otherwise, generate a fresh AI scenario on the fly
    setGeneratingScenario(true);
    try {
      const existingSituations = scenarios.map((s) => s.situation);
      const newScenario = await generateNewScenario(existingSituations);
      setScenarios((prev) => [...prev, newScenario]);
      setCurrentIndex((prev) => prev + 1);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Neues Szenario konnte nicht generiert werden.';
      setError(msg);
      if (msg.includes('API Key nicht konfiguriert') || msg.includes('API-Key')) {
        setShowKeyModal(true);
      }
    } finally {
      setGeneratingScenario(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundEffects.playClick();
      setUserInput('');
      setEvaluation(null);
      setError(null);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleGenerateFresh = async () => {
    soundEffects.playClick();
    setGeneratingScenario(true);
    setError(null);
    try {
      const existingSituations = scenarios.map((s) => s.situation);
      const newScenario = await generateNewScenario(existingSituations);
      setScenarios((prev) => [...prev, newScenario]);
      setCurrentIndex(scenarios.length);
      setUserInput('');
      setEvaluation(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'KI-Szenario-Generierung fehlgeschlagen.';
      setError(msg);
      if (msg.includes('API Key nicht konfiguriert') || msg.includes('API-Key')) {
        setShowKeyModal(true);
      }
    } finally {
      setGeneratingScenario(false);
    }
  };

  const handleEvaluate = async () => {
    if (!userInput.trim() || loading) return;
    soundEffects.playClick();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'free_speech') {
        const result = await evaluateFreeSpeech(userInput);
        setFreeEvaluation(result);
        if (result.score >= 80) {
          soundEffects.playCorrect();
        } else {
          soundEffects.playMistake();
        }
      } else {
        const result = await evaluateSandboxSentence(activePrompt.situation, userInput);
        setEvaluation(result);
        if (result.status === 'correct') {
          soundEffects.playCorrect();
        } else {
          soundEffects.playMistake();
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Auswertung fehlgeschlagen.';
      setError(msg);
      if (msg.includes('API Key nicht konfiguriert') || msg.includes('API-Key')) {
        setShowKeyModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    saveLocalApiKey(apiKeyInput.trim());
    setHasApiKey(Boolean(apiKeyInput.trim()));
    setShowKeyModal(false);
    setError(null);
  };

  const getStatusBadge = (status: SandboxEvaluation['status']) => {
    if (status === 'correct') {
      return {
        icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
        label: 'Perfekt formuliert!',
      };
    }
    if (status === 'minor_mistake') {
      return {
        icon: <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Verbesserungsvorschlag',
      };
    }
    return {
      icon: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      label: 'Korrekturbedarf',
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 overflow-visible">
      {/* Top Bar with Mode Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-md border border-sky-200 dark:border-sky-800">
              {mode === 'free_speech' ? 'Sensei Feedback' : 'KI-Satzbau Sandbox'}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {mode === 'free_speech'
                ? 'Freies Schreiben & Korrektur'
                : `Szenario ${currentIndex + 1} ${isAi ? '• KI-Generiert' : ''}`}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {mode === 'free_speech' ? 'Freies Schreiben' : 'Freies Satzbau-Training'}
          </h1>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => handleSwitchMode('scenario')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'scenario'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700/60'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Szenario-Training
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('free_speech')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                mode === 'free_speech'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700/60'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Freies Schreiben
            </button>
          </div>

          {/* API Key Modal Button */}
          <button
            type="button"
            onClick={() => setShowKeyModal((prev) => !prev)}
            title="DeepSeek API-Schlüssel verwalten"
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition ${
              hasApiKey
                ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                : 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span className="font-mono">{hasApiKey ? 'API-Key' : 'Key eingeben'}</span>
          </button>

          {/* Scenario-only Controls */}
          {mode === 'scenario' && (
            <>
              {/* Neues KI-Szenario Button */}
              <button
                type="button"
                onClick={handleGenerateFresh}
                disabled={generatingScenario}
                className="flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-300 hover:text-white bg-sky-50 dark:bg-sky-500/15 hover:bg-sky-600 dark:hover:bg-sky-500/25 border border-sky-200 dark:border-sky-500/30 px-3 py-2 rounded-lg transition-all active:scale-95 disabled:opacity-40"
              >
                {generatingScenario ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-500" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                )}
                <span>Neues KI-Szenario</span>
              </button>

              {/* Prev / Next Pagination Controls */}
              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors border-r border-slate-200 dark:border-slate-800"
                  title="Vorheriges Szenario"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={generatingScenario}
                  className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1"
                  title="Nächstes Szenario (generiert endlos)"
                >
                  <span>Weiter</span>
                  {generatingScenario ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                DeepSeek API-Schlüssel
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowKeyModal(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Schließen
            </button>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Standardmäßig wird <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">VITE_DEEPSEEK_API_KEY</code> aus deiner <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.env.local</code> gelesen. Alternativ kannst du deinen Schlüssel hier für diese Browsersitzung speichern:
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="sk-..."
              className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              type="button"
              onClick={handleSaveApiKey}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition"
            >
              Speichern
            </button>
          </div>
        </div>
      )}

      {/* Scenario Mode: Active Scenario Card */}
      {mode === 'scenario' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm overflow-visible">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-sky-700 dark:text-sky-400 font-semibold uppercase">{activePrompt.category}</span>
            <span>{activePrompt.id}</span>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-snug">
            {activePrompt.situation}
          </h3>

          {/* Hint Box with AutoJapanese Tooltips */}
          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 overflow-visible">
            <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed overflow-visible">
              <strong className="text-slate-900 dark:text-slate-200">Tipp: </strong>
              <AutoJapanese text={activePrompt.hint} />
            </div>
          </div>
        </div>
      )}

      {/* Free Speech Mode: Info Card */}
      {mode === 'free_speech' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm overflow-visible">
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-sky-700 dark:text-sky-400 font-semibold uppercase">Freies Schreiben & Sensei Correction</span>
            <span>Free Writing Mode</span>
          </div>

          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-snug">
            Schreibe frei ohne feste Vorgabe
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Formuliere jeden beliebigen Gedanken auf Japanisch oder Romaji. Sensei korrigiert Fehler präzise, liefert eine natürliche Alltagsvariante und erklärt dir die grammatikalischen Feinheiten.
          </p>

          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 overflow-visible">
            <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed overflow-visible">
              <strong className="text-slate-900 dark:text-slate-200">Sensei-Tipp: </strong>
              <span>Egal ob Romaji (<AutoJapanese text="Shuumatsu ni issho ni eiga o mimasen ka" />) oder Kanji/Kana (<AutoJapanese text="週末に一緒に映画を見ませんか" />) – Sensei spiegelt deine Schriftart und trennt reines Japanisch für die Sprachausgabe.</span>
            </div>
          </div>
        </div>
      )}

      {/* Input Field with Enter Listener */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEvaluate()}
            placeholder={
              mode === 'free_speech'
                ? 'Schreibe frei auf Japanisch oder Romaji (z.B. Shuumatsu ni issho ni eiga o mimasen ka)...'
                : 'Schreibe auf Japanisch oder Romaji (z.B. Ashita densha de ikimasu / 明日電車で行きます)...'
            }
            className="w-full px-4 py-4 pr-28 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-lg font-medium focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-inner"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleEvaluate}
            disabled={loading || !userInput.trim()}
            className="absolute right-2.5 top-2.5 bottom-2.5 px-4 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Prüfen
          </button>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Drücke <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">Enter</kbd> zum Einreichen</span>
          <span>Echtzeit-Feedback via DeepSeek V4 Flash • Romaji & Kana/Kanji</span>
        </div>
      </div>

      {/* Error Card */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Free Speech Evaluation Card */}
      {mode === 'free_speech' && freeEvaluation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-lg overflow-visible"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              {freeEvaluation.score >= 80 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              )}
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Sensei Feedback
              </span>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              Score: {freeEvaluation.score}/100
            </span>
          </div>

          {/* 1. Korrektur / Ideale Fassung */}
          <div className="space-y-1.5 overflow-visible">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">
              1. Korrektur / Ideale Fassung (Corrected Sentence):
            </span>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-visible">
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100 overflow-visible pr-3">
                <AutoJapanese text={freeEvaluation.correction_display} />
              </div>
              <AudioButton text={freeEvaluation.audio_text || freeEvaluation.correction_display} />
            </div>
          </div>

          {/* 2. Natürliche Alltagsvariante */}
          {freeEvaluation.casual_display && (
            <div className="space-y-1.5 overflow-visible">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">
                  2. Natürliche Alltagsvariante (Native Alternative):
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 overflow-visible">
                <div className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 overflow-visible pr-3">
                  <AutoJapanese text={freeEvaluation.casual_display} />
                </div>
                <AudioButton text={freeEvaluation.casual_audio_text || freeEvaluation.casual_display} />
              </div>
            </div>
          )}

          {/* 3. Sensei Feedback */}
          <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4 overflow-visible">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">
              3. Sensei Feedback (Kurze Erklärung):
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 overflow-visible">
                <span className="font-semibold text-sky-700 dark:text-sky-400">Fehleranalyse</span>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-visible">
                  <AutoJapanese text={freeEvaluation.teacher_notes.correction_reason} />
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 overflow-visible">
                <span className="font-semibold text-sky-700 dark:text-sky-400">Tipp</span>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-visible">
                  <AutoJapanese text={freeEvaluation.teacher_notes.tip} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scenario Evaluation Card */}
      {mode === 'scenario' && evaluation && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-lg overflow-visible"
        >
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              {getStatusBadge(evaluation.status).icon}
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {getStatusBadge(evaluation.status).label}
              </span>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              Score: {evaluation.score}/100
            </span>
          </div>

          <div className="space-y-1.5 overflow-visible">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Korrektur / Ideale Fassung:</span>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-visible">
              <div className="text-xl font-bold text-slate-900 dark:text-slate-100 overflow-visible pr-3">
                <AutoJapanese text={evaluation.correctedSentence} />
              </div>
              <AudioButton text={evaluation.audio_text || evaluation.correctedSentence} />
            </div>
          </div>

          {evaluation.naturalAlternative && evaluation.naturalAlternative !== evaluation.correctedSentence && (
            <div className="space-y-1.5 overflow-visible">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">
                  Natürliche Alltagsvariante:
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 overflow-visible">
                <div className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 overflow-visible pr-3">
                  <AutoJapanese text={evaluation.naturalAlternative} />
                </div>
                <AudioButton text={evaluation.naturalAlternativeAudio || evaluation.naturalAlternative} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 overflow-visible">
              <span className="font-semibold text-sky-700 dark:text-sky-400">Partikel & Satzbau</span>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-visible">
                <AutoJapanese text={evaluation.particleFeedback} />
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1 overflow-visible">
              <span className="font-semibold text-sky-700 dark:text-sky-400">Höflichkeitsform</span>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-visible">
                <AutoJapanese text={evaluation.politenessFeedback} />
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3 overflow-visible">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Erklärung: </span>
            <AutoJapanese text={evaluation.explanationDe} />
          </div>
        </motion.div>
      )}
    </div>
  );
};
