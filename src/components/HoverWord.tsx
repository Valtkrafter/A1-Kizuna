import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { A1_DICTIONARY } from '../data/dictionary';
import { fetchAiWordDetails, getCachedAnalysis, type AiKanjiAnalysis } from '../services/aiDictionary';
import { toRomaji } from '../utils/kanaRomaji';
import { soundEffects } from '../utils/soundEffects';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface HoverWordProps {
  word: string;
}

export const HoverWord: React.FC<HoverWordProps> = ({ word }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAiCard, setShowAiCard] = useState(false);
  const [aiData, setAiData] = useState<AiKanjiAnalysis | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const spanRef = useRef<HTMLSpanElement>(null);

  // Clean word of punctuation before lookup
  const cleanWord = word.replace(/[、。・「」『』\s!?！？,.~〜()（）*]/g, '').trim();
  const lookupWord = cleanWord || word;
  const dict = A1_DICTIONARY[cleanWord] || A1_DICTIONARY[word];

  // Derive cached AI analysis directly (0ms lookup)
  const cachedAnalysis = isHovered ? getCachedAnalysis(cleanWord) : null;
  const effectiveAiData = aiData || cachedAnalysis;

  // 1. Instant Romaji Resolution
  const romaji = dict?.romaji || effectiveAiData?.romaji || toRomaji(lookupWord);
  const staticMeaning = dict?.de;

  const updateAlignment = () => {
    if (spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      if (rect.left < 130) {
        setAlign('left');
      } else if (window.innerWidth - rect.right < 130) {
        setAlign('right');
      } else {
        setAlign('center');
      }
    }
  };

  // 2. Auto-fetch translation when hovering over unlisted terms
  const handleMouseEnter = () => {
    updateAlignment();
    setIsHovered(true);

    if (!staticMeaning && !effectiveAiData && !loadingAi && cleanWord) {
      setLoadingAi(true);
      fetchAiWordDetails(cleanWord)
        .then((res) => {
          setAiData(res);
          setAiError(null);
        })
        .catch((err: unknown) => {
          console.warn('AI dict fallback failed', err);
          const msg = err instanceof Error ? err.message : 'KI-Übersetzung fehlgeschlagen.';
          setAiError(msg);
        })
        .finally(() => setLoadingAi(false));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowAiCard(false);
    setAiError(null);
  };

  const handleAiDeepDive = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    soundEffects.playClick();
    setShowAiCard((prev) => !prev);
    setAiError(null);

    if (effectiveAiData || loadingAi) return;

    setLoadingAi(true);
    try {
      const result = await fetchAiWordDetails(cleanWord);
      setAiData(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'KI-Analyse nicht verfügbar.';
      setAiError(msg);
    } finally {
      setLoadingAi(false);
    }
  };

  const activeMeaning = staticMeaning || effectiveAiData?.literalMeaning;

  let tooltipAlignClass = 'left-1/2 -translate-x-1/2';
  let arrowAlignClass = 'left-1/2 -translate-x-1/2';
  if (align === 'left') {
    tooltipAlignClass = 'left-0 translate-x-0';
    arrowAlignClass = 'left-4 translate-x-0';
  } else if (align === 'right') {
    tooltipAlignClass = 'right-0 translate-x-0';
    arrowAlignClass = 'right-4 translate-x-0';
  }

  return (
    <span
      ref={spanRef}
      className="relative inline-block mx-[1.5px] overflow-visible select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="cursor-pointer font-medium text-slate-100 hover:text-sky-300 transition-colors border-b border-dashed border-sky-400/80 pb-[1px]">
        {word}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute bottom-full mb-2.5 z-[9999] min-w-[180px] max-w-[300px] p-3 rounded-xl bg-[#0F172A] border border-slate-700 shadow-2xl text-left pointer-events-auto cursor-default ${tooltipAlignClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Romaji + AI Button */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-mono text-sm font-bold text-sky-400 tracking-wide">
                {romaji}
              </span>
              <button
                type="button"
                onClick={handleAiDeepDive}
                className="flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 transition-all active:scale-95 cursor-pointer shrink-0"
                title="KI-Kanji & Grammatik-Analyse"
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>KI-Details</span>
              </button>
            </div>

            {/* Translation Display */}
            {activeMeaning ? (
              <div className="text-xs font-sans text-slate-200 leading-snug">
                {activeMeaning}
              </div>
            ) : loadingAi ? (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 py-0.5">
                <Loader2 className="w-3 h-3 animate-spin text-sky-400 shrink-0" />
                <span>Ermittle Übersetzung...</span>
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">Japanisches Wortelement</div>
            )}

            {/* AI Error Alert */}
            {aiError && (
              <div className="mt-2 flex items-start gap-1.5 p-2 rounded bg-rose-950/50 border border-rose-800/60 text-rose-300 text-[10px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                <span>{aiError}</span>
              </div>
            )}

            {/* Extended AI Deep Dive Card */}
            {showAiCard && (
              <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] space-y-1.5 animate-in fade-in duration-200">
                {loadingAi && !effectiveAiData && (
                  <div className="flex items-center gap-2 py-1 text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400 shrink-0" />
                    <span className="text-[10px]">Lade KI-Details...</span>
                  </div>
                )}

                {effectiveAiData && (
                  <>
                    {effectiveAiData.breakdown && effectiveAiData.breakdown.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Wurzeln:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {effectiveAiData.breakdown.map((b, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-slate-300 font-mono text-[10px]"
                            >
                              <strong className="text-sky-300">{b.character}:</strong> {b.meaning}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {effectiveAiData.nuanceDe && (
                      <p className="text-slate-300 leading-relaxed italic bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px]">
                        💡 {effectiveAiData.nuanceDe}
                      </p>
                    )}

                    {effectiveAiData.jlptLevel && (
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                        <span>Niveau:</span>
                        <span className="font-mono font-bold text-sky-400 bg-sky-950/40 px-1.5 py-0.2 rounded border border-sky-800/40">
                          {effectiveAiData.jlptLevel}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Arrow pointer */}
            <div
              className={`absolute top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0F172A] pointer-events-none ${arrowAlignClass}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
