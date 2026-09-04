import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { A1_DICTIONARY } from '../data/dictionary';
import { getFallbackRomaji } from '../utils/kana';
import { fetchAiWordDetails, getCachedAnalysis, type AiKanjiAnalysis } from '../services/aiDictionary';
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

  // Clean word for dictionary / AI lookup
  const cleanWord = word.replace(/[〜~「」()（）*]/g, '').trim();
  const lookupWord = cleanWord || word;

  // Tier 1: Local dictionary instant lookup with kana fallback
  const dictInfo = A1_DICTIONARY[word] || A1_DICTIONARY[cleanWord];
  const romaji = dictInfo?.romaji || getFallbackRomaji(lookupWord);
  const meaning = dictInfo?.de || '';

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

  const handleMouseEnter = () => {
    updateAlignment();
    // Check if AI data is already cached
    const cached = getCachedAnalysis(lookupWord);
    if (cached) {
      setAiData(cached);
    }
    setIsHovered(true);
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
    setShowAiCard(true);
    setAiError(null);

    if (aiData) return;

    // Check cache
    const cached = getCachedAnalysis(lookupWord);
    if (cached) {
      setAiData(cached);
      return;
    }

    setLoadingAi(true);
    try {
      const result = await fetchAiWordDetails(lookupWord);
      setAiData(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'KI-Analyse nicht verfügbar.';
      setAiError(msg);
    } finally {
      setLoadingAi(false);
    }
  };

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
      {/* Clickable token span with dotted underline */}
      <span className="cursor-pointer font-medium text-slate-100 hover:text-sky-300 transition-colors underline decoration-dotted decoration-sky-400 dark:decoration-sky-500 underline-offset-4 pb-[1px]">
        {word}
      </span>

      {/* Floating Tooltip Card */}
      <AnimatePresence>
        {isHovered && (romaji || meaning) && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute bottom-full mb-2.5 z-[9999] min-w-[200px] max-w-[320px] p-3 rounded-xl bg-[#0B132B] border border-slate-700/80 shadow-2xl text-left pointer-events-auto cursor-default ${tooltipAlignClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header: Romaji + Tier-2 KI Button */}
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

            {/* Tier 1 Instant Meaning */}
            {meaning && (
              <div className="text-xs font-sans text-slate-200 leading-snug">
                {meaning}
              </div>
            )}

            {/* Tier 2 Expandable AI Breakdown */}
            {showAiCard && (
              <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] space-y-2">
                {loadingAi && (
                  <div className="flex items-center gap-2 py-1 text-slate-400">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-400 shrink-0" />
                    <span className="text-xs">Lade linguistische KI-Analyse...</span>
                  </div>
                )}

                {aiError && (
                  <div className="flex items-start gap-1.5 p-2 rounded bg-rose-950/50 border border-rose-800/60 text-rose-300 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-400" />
                    <span>{aiError}</span>
                  </div>
                )}

                {aiData && !loadingAi && (
                  <div className="space-y-2">
                    {/* Kanji Roots Breakdown */}
                    {aiData.breakdown && aiData.breakdown.length > 0 && (
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                          Wurzeln & Kanji:
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {aiData.breakdown.map((b, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/60 text-slate-300 font-mono text-[11px]"
                            >
                              <strong className="text-sky-300 font-semibold">{b.character}:</strong>{' '}
                              {b.meaning}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Nuance & Usage */}
                    {aiData.nuanceDe && (
                      <div className="text-slate-300 leading-relaxed italic bg-slate-900/80 p-2 rounded-lg border border-slate-800 text-[11px]">
                        💡 {aiData.nuanceDe}
                      </div>
                    )}

                    {/* JLPT Level */}
                    {aiData.jlptLevel && (
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                        <span>Niveau:</span>
                        <span className="font-mono font-bold text-sky-400 bg-sky-950/40 px-1.5 py-0.2 rounded border border-sky-800/40">
                          {aiData.jlptLevel}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Arrow Pointer */}
            <div
              className={`absolute top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#0B132B] pointer-events-none ${arrowAlignClass}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
