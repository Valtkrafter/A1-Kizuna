import { romajiToHiragana } from './kanaRomaji';

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

    // 1. If text contains parenthesized Japanese script e.g. "Romaji sentence (日本語)",
    // prefer speaking the Japanese script directly for 100% natural, authentic pronunciation
    const parenthesizedJaMatch = text.match(/[（(]([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\s、。！？]+)[）)]/);
    let targetText = parenthesizedJaMatch ? parenthesizedJaMatch[1] : text;

    // 2. Prevent mixed alphabets: If text contains Japanese characters, strip any Latin letters
    // and extraneous characters so Japanese TTS voices never crash or fail silently
    const hasJapanese = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(targetText);
    if (hasJapanese) {
      // Strip Latin letters, slashes, and notes
      targetText = targetText.replace(/[a-zA-Z]/g, '');
    } else {
      // If pure Romaji without Japanese characters, convert to Hiragana for native ja-JP speech
      targetText = romajiToHiragana(targetText);
    }

    // 3. Clean fill-in blanks (_____), brackets, and formatting before synthesis
    const sanitized = targetText
      .replace(/_{2,}/g, '')
      .replace(/[<>[\]()（）/]/g, '')
      .trim();

    if (!sanitized) {
      onEnd?.();
      return;
    }

    // Ensure voice is loaded (some browsers populate asynchronously)
    if (!this.voice) {
      this.loadVoice();
    }

    // Fix for Chrome/Edge where speechSynthesis occasionally gets paused in background
    if (this.synth.paused) {
      this.synth.resume();
    }

    const utterance = new SpeechSynthesisUtterance(sanitized);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88; // Natural, clear cadence for A1 learners
    utterance.pitch = 1.0;

    if (this.voice) {
      utterance.voice = this.voice;
    }

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      onEnd?.();
    };

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
