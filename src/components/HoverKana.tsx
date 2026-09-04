import React, { useState, useRef, useEffect } from 'react';

export interface HoverKanaProps {
  japanese: string;
  romaji: string;
  german?: string;
  className?: string;
}

export const HoverKana: React.FC<HoverKanaProps> = ({
  japanese,
  romaji,
  german,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [align, setAlign] = useState<'center' | 'left' | 'right'>('center');
  const containerRef = useRef<HTMLSpanElement>(null);

  // Compute boundary safe alignment whenever tooltip opens
  const updateAlignment = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // If word is within 100px of left viewport edge or parent boundary
      if (rect.left < 100) {
        setAlign('left');
      } else if (window.innerWidth - rect.right < 100) {
        setAlign('right');
      } else {
        setAlign('center');
      }
    }
  };

  const handleOpen = () => {
    updateAlignment();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Mobile tap outside to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Determine positioning classes based on boundary alignment
  let tooltipPositionClass = 'left-1/2 -translate-x-1/2';
  let arrowPositionClass = 'left-1/2 -translate-x-1/2';

  if (align === 'left') {
    tooltipPositionClass = 'left-0 translate-x-0';
    arrowPositionClass = 'left-3 translate-x-0';
  } else if (align === 'right') {
    tooltipPositionClass = 'right-0 left-auto translate-x-0';
    arrowPositionClass = 'right-3 left-auto translate-x-0';
  }

  return (
    <span
      ref={containerRef}
      className={`relative inline-block overflow-visible ${className}`}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={() => {
        if (!isOpen) {
          updateAlignment();
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }}
    >
      <span
        className="border-b border-dotted border-slate-400 dark:border-slate-500 cursor-help hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-['Noto_Sans_JP',sans-serif]"
        title={`${japanese} [${romaji}]${german ? ` - ${german}` : ''}`}
      >
        {japanese}
      </span>

      {/* Boundary-Safe Floating Tooltip */}
      {isOpen && (
        <span
          role="tooltip"
          className={`absolute bottom-full mb-2 z-[9999] pointer-events-none whitespace-nowrap animate-tooltip-pop text-left block bg-slate-900 text-slate-100 dark:bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs shadow-xl ${tooltipPositionClass}`}
        >
          {/* Romaji Reading in bold */}
          <span className="block font-mono text-xs font-bold text-blue-400 tracking-wide">
            {romaji}
          </span>

          {/* German Translation */}
          {german && (
            <span className="text-[11px] text-slate-300 font-normal block mt-0.5">
              {german}
            </span>
          )}

          {/* Downward triangle arrow indicator */}
          <span
            className={`absolute top-full -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-800 ${arrowPositionClass}`}
          />
        </span>
      )}
    </span>
  );
};
