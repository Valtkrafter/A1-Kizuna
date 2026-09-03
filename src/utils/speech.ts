class JapaneseSpeechEngine {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    this.selectedVoice =
      voices.find(
        (v) =>
          v.lang.includes('ja') &&
          (v.name.includes('Natural') ||
            v.name.includes('Online') ||
            v.name.includes('Neural'))
      ) ||
      voices.find(
        (v) =>
          v.lang === 'ja-JP' ||
          v.name.includes('Kyoko') ||
          v.name.includes('Otoya')
      ) ||
      voices.find((v) => v.lang.startsWith('ja')) ||
      null;
  }

  public speak(text: string, onStart?: () => void, onEnd?: () => void) {
    if (!this.synth) return;
    this.synth.cancel();

    const cleanText = text
      .replace(/_{2,}/g, '')
      .replace(/[<>]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\(.*?\)/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88;
    utterance.pitch = 1.0;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        onEnd?.();
      }
    };

    this.synth.speak(utterance);
  }
}

export const speechEngine = new JapaneseSpeechEngine();

// Convenient functional helper for components
export const speakJapanese = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) => {
  speechEngine.speak(text, onStart, onEnd);
};
