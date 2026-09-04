import React, { useState } from 'react';
import { SANDBOX_PROMPTS } from '../data/sandboxPrompts';
import {
  evaluateSandboxSentence,
  getActiveApiKey,
  saveLocalApiKey,
  type SandboxEvaluation,
} from '../services/deepseek';
import { AutoJapanese } from './AutoJapanese';
import { AudioButton } from './AudioButton';
import {
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  KeyRound,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const SandboxView: React.FC = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluation, setEvaluation] = useState<SandboxEvaluation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState<string>(() => getActiveApiKey());
  const [hasApiKey, setHasApiKey] = useState<boolean>(() => Boolean(getActiveApiKey()));

  const activePrompt = SANDBOX_PROMPTS[currentPromptIndex];

  const handleEvaluate = async () => {
    if (!userInput.trim() || loading) return;
    setLoading(true);
    setError(null);

    try {
      const result = await evaluateSandboxSentence(activePrompt.situation, userInput);
      setEvaluation(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Auswertung fehlgeschlagen.';
      setError(msg);
      if (msg.includes('API Key nicht konfiguriert')) {
        setShowKeyModal(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setUserInput('');
    setEvaluation(null);
    setError(null);
    setCurrentPromptIndex((prev) => (prev + 1) % SANDBOX_PROMPTS.length);
  };

  const handlePrev = () => {
    setUserInput('');
    setEvaluation(null);
    setError(null);
    setCurrentPromptIndex((prev) => (prev - 1 + SANDBOX_PROMPTS.length) % SANDBOX_PROMPTS.length);
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
        badgeClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      };
    }
    if (status === 'minor_mistake') {
      return {
        icon: <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
        label: 'Kleine Abweichung / Verbesserungsvorschlag',
        badgeClass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      };
    }
    return {
      icon: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      label: 'Korrekturbedarf',
      badgeClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 overflow-visible">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-md border border-sky-200 dark:border-sky-800">
              KI-Satzbau Sandbox
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              Szenario {currentPromptIndex + 1} von {SANDBOX_PROMPTS.length}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-2">
            Freies Satzbau-Training
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Formuliere freie japanische Sätze passend zur Situation und erhalte unmittelbares, tiefgehendes Feedback.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            <span className="font-mono">{hasApiKey ? 'API-Key aktiv' : 'Key eingeben'}</span>
          </button>

          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border-r border-slate-200 dark:border-slate-700 transition"
              title="Vorheriges Szenario"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1 text-xs font-medium px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            >
              <span>Weiter</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Optional API Key Configuration Card */}
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

      {/* Scenario Prompt Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors overflow-visible">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 px-2.5 py-1 rounded border border-sky-200 dark:border-sky-800">
            {activePrompt.category}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            ID: {activePrompt.id}
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
            {activePrompt.situation}
          </h2>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 overflow-visible">
          <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div className="overflow-visible leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Tipp: </span>
            <AutoJapanese text={activePrompt.hint} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEvaluate()}
            placeholder="Schreibe deinen japanischen Satz (z.B. 写真を撮ってください)..."
            className="w-full pl-4 pr-32 py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg font-medium focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all shadow-sm"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleEvaluate}
            disabled={loading || !userInput.trim()}
            className="absolute right-2 top-2 bottom-2 px-5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analysiert...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Prüfen</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Drücke <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded font-mono text-[10px]">Enter</kbd> zum Einreichen</span>
          <span>Echtzeit-Feedback via DeepSeek AI</span>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs sm:text-sm flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <p className="font-semibold">{error}</p>
              {!hasApiKey && (
                <p className="mt-1 text-xs opacity-90">
                  Starte deinen Vite Dev-Server im Terminal neu (<kbd className="font-mono bg-rose-100 dark:bg-rose-900/60 px-1 py-0.5 rounded">Ctrl+C</kbd> dann <kbd className="font-mono bg-rose-100 dark:bg-rose-900/60 px-1 py-0.5 rounded">npm run dev</kbd>), damit Vite die neue <code className="font-mono">.env.local</code> einliest, oder füge den Key direkt hier ein:
                </p>
              )}
            </div>
          </div>
          {!hasApiKey && (
            <div className="flex gap-2 pt-1 pl-7">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-..."
                className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-rose-300 dark:border-rose-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition shrink-0"
              >
                Key speichern
              </button>
            </div>
          )}
        </div>
      )}

      {/* Evaluation Results Card */}
      {evaluation && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm overflow-visible animate-in fade-in duration-200">
          {/* Status Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              {getStatusBadge(evaluation.status).icon}
              <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                {getStatusBadge(evaluation.status).label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                Score: {evaluation.score}/100
              </span>
            </div>
          </div>

          {/* User's Original Input */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Deine Eingabe:
            </span>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-base font-medium text-slate-800 dark:text-slate-200">
              {userInput}
            </div>
          </div>

          {/* Corrected Sentence Row */}
          <div className="space-y-1.5 overflow-visible">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Korrektur / Ideale Fassung:
            </span>
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-visible">
              <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 overflow-visible pr-3">
                <AutoJapanese text={evaluation.correctedSentence} />
              </div>
              <AudioButton text={evaluation.correctedSentence} />
            </div>
          </div>

          {/* Natural Native Alternative (if provided) */}
          {evaluation.naturalAlternative && evaluation.naturalAlternative !== evaluation.correctedSentence && (
            <div className="space-y-1.5 overflow-visible">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Natürliche Alltagsvariante:
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 overflow-visible">
                <div className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-200 overflow-visible pr-3">
                  <AutoJapanese text={evaluation.naturalAlternative} />
                </div>
                <AudioButton text={evaluation.naturalAlternative} />
              </div>
            </div>
          )}

          {/* Granular Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs overflow-visible">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5 overflow-visible">
              <span className="font-bold text-sky-700 dark:text-sky-400 text-xs uppercase tracking-wider block">
                Partikeln & Grammatik
              </span>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-visible">
                <AutoJapanese text={evaluation.particleFeedback} />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-1.5 overflow-visible">
              <span className="font-bold text-sky-700 dark:text-sky-400 text-xs uppercase tracking-wider block">
                Höflichkeitsform
              </span>
              <div className="text-slate-700 dark:text-slate-300 leading-relaxed overflow-visible">
                <AutoJapanese text={evaluation.politenessFeedback} />
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-4 overflow-visible">
            <span className="font-semibold text-slate-900 dark:text-slate-100">Erklärung: </span>
            <AutoJapanese text={evaluation.explanationDe} />
          </div>
        </div>
      )}
    </div>
  );
};
