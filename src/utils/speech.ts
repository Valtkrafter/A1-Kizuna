class JapaneseAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoice();
      }
    }
  }

  private loadVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prioritize natural / neural / AI Japanese voices
    this.voice =
      voices.find(
        (v) =>
          v.lang.includes('ja') &&
          (v.name.includes('Natural') ||
            v.name.includes('Neural') ||
            v.name.includes('Online'))
      ) ||
      voices.find((v) => v.lang === 'ja-JP' || v.lang.startsWith('ja')) ||
      null;
  }

  public play(text: string, onStart?: () => void, onEnd?: () => void) {
    if (!this.synth) return;

    this.synth.cancel(); // Stop any pending speech

    // Clean fill-in blanks (_____), brackets, and HTML before synthesis
    const sanitized = text
      .replace(/_{2,}/g, '')
      .replace(/[<>[\]()]/g, '')
      .trim();
    if (!sanitized) return;

    const utterance = new SpeechSynthesisUtterance(sanitized);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88; // Natural, clear cadence for A1 learners
    utterance.pitch = 1.0;

    if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    this.synth.speak(utterance);
  }
}

export const japaneseAudio = new JapaneseAudioEngine();

export const speakJapanese = (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) => {
  japaneseAudio.play(text, onStart, onEnd);
};
