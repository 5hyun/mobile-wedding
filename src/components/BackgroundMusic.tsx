"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/bgm.mp3";
const AUDIO_VOLUME = 0.58;

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const playAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio || !isAudioOn) {
      return;
    }

    audio.muted = false;
    audio.volume = AUDIO_VOLUME;

    void audio.play().catch(() => {
      // Browsers can block unmuted autoplay until the first user gesture.
    });
  }, [isAudioOn]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = AUDIO_VOLUME;

    if (isAudioOn) {
      playAudio();
      return;
    }

    audio.pause();
  }, [isAudioOn, playAudio]);

  useEffect(() => {
    if (!isAudioOn) {
      return;
    }

    const handleUserGesture = () => {
      if (!audioRef.current?.paused) {
        return;
      }

      playAudio();
    };

    window.addEventListener("pointerdown", handleUserGesture, { passive: true });
    window.addEventListener("keydown", handleUserGesture);

    return () => {
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
    };
  }, [isAudioOn, playAudio]);

  const handleToggleClick = () => {
    const nextIsAudioOn = !isAudioOn;
    const audio = audioRef.current;

    setIsAudioOn(nextIsAudioOn);

    if (!audio) {
      return;
    }

    if (nextIsAudioOn) {
      audio.muted = false;
      audio.volume = AUDIO_VOLUME;
      void audio.play().catch(() => {});
      return;
    }

    audio.pause();
  };

  const Icon = isAudioOn ? Volume2 : VolumeX;

  return (
    <div className="music-toggle" aria-label="배경 음악">
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" loop autoPlay />
      <button
        className={`floating-action-button music-toggle-button${
          isAudioOn ? " is-on" : ""
        }`}
        type="button"
        onClick={handleToggleClick}
        aria-label={isAudioOn ? "배경 음악 끄기" : "배경 음악 켜기"}
        aria-pressed={isAudioOn}
      >
        <Icon className="action-icon" size={23} aria-hidden="true" />
      </button>
    </div>
  );
}
