"use client";

import { useState } from "react";
import { setSoundEnabled } from "./ui-sounds";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(true);

  function toggleSound() {
    const nextEnabled = !enabled;
    setEnabled(nextEnabled);
    setSoundEnabled(nextEnabled);
  }

  return (
    <button
      className={`sound-toggle${enabled ? " sound-enabled" : ""}`}
      type="button"
      onClick={toggleSound}
      aria-label={enabled ? "Desativar sons da página" : "Ativar sons da página"}
      aria-pressed={enabled}
      title={enabled ? "Desativar sons" : "Ativar sons"}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
        {enabled ? <path d="M16 9a4 4 0 0 1 0 6m2.5-8.5a7.5 7.5 0 0 1 0 11" /> : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
    </button>
  );
}
