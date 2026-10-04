let audioContext: AudioContext | null = null;
let lastTickAt = 0;
let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

function getAudioContext() {
  if (typeof window === "undefined") return null;

  const browserWindow = window as Window & { webkitAudioContext?: typeof AudioContext };
  const AudioContextConstructor = window.AudioContext ?? browserWindow.webkitAudioContext;
  if (!AudioContextConstructor) return null;

  audioContext ??= new AudioContextConstructor();
  return audioContext;
}

async function withReadyAudio(play: (context: AudioContext) => void) {
  const context = getAudioContext();
  if (!context) return;

  try {
    if (context.state === "suspended") await context.resume();
    play(context);
  } catch {
    // Browser audio may be unavailable or muted; keep the interaction working silently.
  }
}

export function playHoverTick() {
  if (!soundEnabled) return;
  const now = performance.now();
  if (now - lastTickAt < 70) return;
  lastTickAt = now;

  void withReadyAudio((context) => {
    const time = context.currentTime;
    const oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.value = 3800;

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.022, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.03);

    oscillator.connect(gain).connect(context.destination);
    oscillator.start(time);
    oscillator.stop(time + 0.04);
  });
}

export function playTap() {
  if (!soundEnabled) return;
  void withReadyAudio((context) => {
    const time = context.currentTime;

    const tone = context.createOscillator();
    tone.type = "sine";
    tone.frequency.setValueAtTime(1650, time);
    tone.frequency.exponentialRampToValueAtTime(1100, time + 0.05);

    const toneGain = context.createGain();
    toneGain.gain.setValueAtTime(0.0015, time);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    tone.connect(toneGain).connect(context.destination);
    tone.start(time);
    tone.stop(time + 0.15);

    const lowTone = context.createOscillator();
    lowTone.type = "sine";
    lowTone.frequency.value = 210;

    const lowGain = context.createGain();
    lowGain.gain.setValueAtTime(0.0015, time);
    lowGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.12);
    lowTone.connect(lowGain).connect(context.destination);
    lowTone.start(time);
    lowTone.stop(time + 0.15);
  });
}
