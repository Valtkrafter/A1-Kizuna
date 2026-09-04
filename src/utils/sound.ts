import { soundEffects } from './soundEffects';

// Backwards-compatible proxy for sound effects
class LegacySoundBridge {
  get enabled(): boolean {
    return soundEffects.enabled;
  }

  set enabled(val: boolean) {
    soundEffects.enabled = val;
  }

  playKeypress() {
    soundEffects.playClick();
  }

  playCorrect() {
    soundEffects.playCorrect();
  }

  playError() {
    soundEffects.playMistake();
  }

  playFinish() {
    soundEffects.playFinish();
  }
}

export const sound = new LegacySoundBridge();
export { soundEffects };
