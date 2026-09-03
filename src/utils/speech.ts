let cachedVoices: SpeechSynthesisVoice[] = [];

// Initialize voices and listen for Chrome/Safari async voice loading
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

export const speakJapanese = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech before starting a new one
  window.speechSynthesis.cancel();

  // Strip out HTML, furigana brackets, or annotations if any exist
  const cleanText = text
    .replace(/<[^>]*>?/gm, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);

  utterance.lang = 'ja-JP';
  utterance.rate = 0.85; // Slightly slower for clear beginner listening

  // Find and select a native Japanese voice if available
  const voices =
    cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  const jaVoice = voices.find(
    (v) => v.lang === 'ja-JP' || v.lang === 'ja_JP' || v.lang.startsWith('ja')
  );
  if (jaVoice) {
    utterance.voice = jaVoice;
  }

  if (onStart) {
    utterance.onstart = onStart;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    if (e.error !== 'canceled' && onEnd) {
      onEnd();
    }
  };

  window.speechSynthesis.speak(utterance);
};
