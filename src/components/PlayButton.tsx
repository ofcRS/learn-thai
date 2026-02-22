import { useState, useRef } from "react";

interface PlayButtonProps {
  audioUrl: string;
}

export function PlayButton({ audioUrl }: PlayButtonProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function handleClick() {
    if (playing) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setPlaying(true);

    audio.play().catch(() => setPlaying(false));
    audio.onended = () => setPlaying(false);
    audio.onerror = () => setPlaying(false);
  }

  return (
    <button
      className={`play-btn${playing ? " playing" : ""}`}
      onClick={handleClick}
      aria-label="Play pronunciation"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        {playing ? (
          <>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </>
        ) : (
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        )}
      </svg>
    </button>
  );
}
