"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/bgm.mp3";
const AUDIO_VOLUME = 0.58;
const AUDIO_PREFERENCE_KEY = "mobile-wedding-bgm";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [wantsAudio, setWantsAudio] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);

  const startAudio = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return false;
    }

    audio.muted = false;
    audio.volume = AUDIO_VOLUME;

    if (audio.readyState === HTMLMediaElement.HAVE_NOTHING) {
      audio.load();
    }

    const blockedHintTimer = window.setTimeout(() => {
      if (audio.paused) {
        setIsAutoplayBlocked(true);
      }
    }, 900);

    try {
      await audio.play();
      window.clearTimeout(blockedHintTimer);
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
      return true;
    } catch {
      window.clearTimeout(blockedHintTimer);
      // Browsers can block unmuted autoplay until the first user gesture.
      setIsPlaying(false);
      setIsAutoplayBlocked(true);
      return false;
    }
  }, []);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
    setIsAutoplayBlocked(false);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const savedPreference = window.localStorage.getItem(AUDIO_PREFERENCE_KEY);

      if (savedPreference === "off") {
        setWantsAudio(false);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = AUDIO_VOLUME;

    const frameId = window.requestAnimationFrame(() => {
      if (wantsAudio) {
        void startAudio();
        return;
      }

      stopAudio();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [startAudio, stopAudio, wantsAudio]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handlePlay = () => {
      setIsPlaying(true);
      setIsAutoplayBlocked(false);
    };
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handlePause);
    };
  }, []);

  useEffect(() => {
    if (!wantsAudio) {
      return;
    }

    const handleUserGesture = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(".music-toggle")) {
        return;
      }

      if (!audioRef.current?.paused) {
        return;
      }

      void startAudio();
    };

    window.addEventListener("pointerdown", handleUserGesture, { passive: true });
    window.addEventListener("touchstart", handleUserGesture, { passive: true });
    window.addEventListener("wheel", handleUserGesture, { passive: true });
    window.addEventListener("keydown", handleUserGesture);

    return () => {
      window.removeEventListener("pointerdown", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
      window.removeEventListener("wheel", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
    };
  }, [startAudio, wantsAudio]);

  const handlePendingPlayback = () => {
    if (!wantsAudio || isPlaying) {
      return;
    }

    window.localStorage.setItem(AUDIO_PREFERENCE_KEY, "on");
    void startAudio();
  };

  const handleToggleClick = () => {
    if (wantsAudio && !isPlaying) {
      window.localStorage.setItem(AUDIO_PREFERENCE_KEY, "on");
      void startAudio();
      return;
    }

    const nextWantsAudio = !wantsAudio;

    setWantsAudio(nextWantsAudio);
    window.localStorage.setItem(AUDIO_PREFERENCE_KEY, nextWantsAudio ? "on" : "off");

    if (nextWantsAudio) {
      void startAudio();
      return;
    }

    stopAudio();
  };

  const Icon = wantsAudio ? Volume2 : VolumeX;
  const isAwaitingGesture = wantsAudio && !isPlaying && isAutoplayBlocked;

  return (
    <div className="music-toggle" aria-label="배경 음악">
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" loop playsInline />
      <button
        className={`floating-action-button music-toggle-button${wantsAudio ? " is-on" : ""}${
          isPlaying ? " is-playing" : ""
        }${isAwaitingGesture ? " is-awaiting-gesture" : ""}`}
        type="button"
        onPointerDown={handlePendingPlayback}
        onTouchStart={handlePendingPlayback}
        onClick={handleToggleClick}
        aria-label={wantsAudio ? (isPlaying ? "배경 음악 끄기" : "배경 음악 재생하기") : "배경 음악 켜기"}
        aria-pressed={wantsAudio}
      >
        <Icon className="action-icon" size={23} aria-hidden="true" />
      </button>
    </div>
  );
}
