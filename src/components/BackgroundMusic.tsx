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

  const syncPlaybackState = useCallback(() => {
    const audio = audioRef.current;

    setIsPlaying(
      Boolean(audio && !audio.paused && !audio.ended && !audio.muted && audio.volume > 0)
    );
  }, []);

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
      syncPlaybackState();
      setIsAutoplayBlocked(false);
      return true;
    } catch {
      window.clearTimeout(blockedHintTimer);
      // Browsers can block unmuted autoplay until the first user gesture.
      setIsPlaying(false);
      setIsAutoplayBlocked(true);
      return false;
    }
  }, [syncPlaybackState]);

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

    const handlePlaying = () => {
      syncPlaybackState();
      setIsAutoplayBlocked(false);
    };
    const handleInactive = () => setIsPlaying(false);
    const handleVolumeChange = () => syncPlaybackState();

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("play", syncPlaybackState);
    audio.addEventListener("pause", handleInactive);
    audio.addEventListener("ended", handleInactive);
    audio.addEventListener("waiting", handleInactive);
    audio.addEventListener("stalled", handleInactive);
    audio.addEventListener("error", handleInactive);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("play", syncPlaybackState);
      audio.removeEventListener("pause", handleInactive);
      audio.removeEventListener("ended", handleInactive);
      audio.removeEventListener("waiting", handleInactive);
      audio.removeEventListener("stalled", handleInactive);
      audio.removeEventListener("error", handleInactive);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [syncPlaybackState]);

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

    const passiveCaptureOptions = { capture: true, passive: true };

    document.addEventListener("pointerdown", handleUserGesture, passiveCaptureOptions);
    document.addEventListener("click", handleUserGesture, passiveCaptureOptions);
    document.addEventListener("touchstart", handleUserGesture, passiveCaptureOptions);
    document.addEventListener("touchend", handleUserGesture, passiveCaptureOptions);
    window.addEventListener("wheel", handleUserGesture, passiveCaptureOptions);
    window.addEventListener("scroll", handleUserGesture, passiveCaptureOptions);
    window.addEventListener("keydown", handleUserGesture, { capture: true });

    return () => {
      document.removeEventListener("pointerdown", handleUserGesture, passiveCaptureOptions);
      document.removeEventListener("click", handleUserGesture, passiveCaptureOptions);
      document.removeEventListener("touchstart", handleUserGesture, passiveCaptureOptions);
      document.removeEventListener("touchend", handleUserGesture, passiveCaptureOptions);
      window.removeEventListener("wheel", handleUserGesture, passiveCaptureOptions);
      window.removeEventListener("scroll", handleUserGesture, passiveCaptureOptions);
      window.removeEventListener("keydown", handleUserGesture, { capture: true });
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

  const Icon = isPlaying ? Volume2 : VolumeX;
  const isAwaitingGesture = wantsAudio && !isPlaying && isAutoplayBlocked;

  return (
    <div className="music-toggle" aria-label="배경 음악">
      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" loop playsInline />
      <button
        className={`floating-action-button music-toggle-button${
          isPlaying ? " is-on is-playing" : ""
        }${isAwaitingGesture ? " is-awaiting-gesture" : ""}`}
        type="button"
        onPointerDown={handlePendingPlayback}
        onTouchStart={handlePendingPlayback}
        onClick={handleToggleClick}
        aria-label={isPlaying ? "배경 음악 끄기" : "배경 음악 재생하기"}
        aria-pressed={isPlaying}
      >
        <Icon className="action-icon" size={23} aria-hidden="true" />
      </button>
    </div>
  );
}
