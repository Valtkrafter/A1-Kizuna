import confetti from 'canvas-confetti';
import { soundEffects } from './soundEffects';

export function fireMasteryCelebration() {
  soundEffects.playCorrect();
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#38bdf8', '#34d399', '#818cf8', '#f472b6'],
    });
  } catch {
    // Graceful fallback if canvas is not supported
  }
}
