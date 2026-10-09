/**
 * Web Audio API synthesizer for fanfare and party sound effects
 * Guaranteed to work without external asset dependencies
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playGiftPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Audio context may be restricted by browser policy before user interaction
  }
}

export function playCelebrationFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [
      { freq: 440, time: 0, dur: 0.18 },      // A4
      { freq: 554.37, time: 0.18, dur: 0.18 }, // C#5
      { freq: 659.25, time: 0.36, dur: 0.22 }, // E5
      { freq: 880, time: 0.58, dur: 0.45 },    // A5
      { freq: 1108.73, time: 0.8, dur: 0.6 },  // C#6
    ];

    notes.forEach(({ freq, time, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

      gain.gain.setValueAtTime(0, ctx.currentTime + time);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + dur);
    });

    // Add bright tropical bell accent
    setTimeout(() => {
      if (!ctx) return;
      const bell = ctx.createOscillator();
      const bellGain = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.setValueAtTime(1318.5, ctx.currentTime); // E6
      bellGain.gain.setValueAtTime(0.25, ctx.currentTime);
      bellGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      bell.connect(bellGain);
      bellGain.connect(ctx.destination);
      bell.start();
      bell.stop(ctx.currentTime + 0.6);
    }, 700);
  } catch {
    // Graceful fallback
  }
}
