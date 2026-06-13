"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const timeUnits = [
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

type CountdownUnitKey = "days" | (typeof timeUnits)[number]["key"];

type DigitState = {
  current: string;
  isDropping: boolean;
  rollId: number;
};

function getTimeLeft(): TimeLeft {
  const targetTime = new Date(wedding.date.iso).getTime();
  const remaining = Math.max(0, targetTime - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function formatCountdownValue(key: CountdownUnitKey, value: number): string {
  if (key === "days") {
    return String(value);
  }

  return String(value).padStart(2, "0");
}

function CountdownDigit({ value }: { value: string }) {
  const currentRef = useRef(value);
  const rollIdRef = useRef(0);
  const [digitState, setDigitState] = useState<DigitState>({
    current: value,
    isDropping: false,
    rollId: 0,
  });

  useEffect(() => {
    if (currentRef.current === value) {
      return;
    }

    const nextRollId = rollIdRef.current + 1;
    currentRef.current = value;
    rollIdRef.current = nextRollId;

    const frameId = window.requestAnimationFrame(() => {
      setDigitState({
        current: value,
        isDropping: true,
        rollId: nextRollId,
      });
    });
    const timerId = window.setTimeout(() => {
      setDigitState((latest) =>
        latest.rollId === nextRollId
          ? {
              ...latest,
              isDropping: false,
            }
          : latest,
      );
    }, 460);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timerId);
    };
  }, [value]);

  return (
    <span className={digitState.isDropping ? "countdown-digit is-dropping" : "countdown-digit"}>
      <span className="countdown-digit-face is-current">{digitState.current}</span>
    </span>
  );
}

function CountdownValue({ value }: { value: string }) {
  const digits = Array.from(value);

  return (
    <span className="countdown-value" aria-hidden="true">
      {digits.map((digit, index) => (
        <CountdownDigit key={index} value={digit} />
      ))}
    </span>
  );
}

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const updateCountdown = () => setTimeLeft(getTimeLeft());
    const frameId = window.requestAnimationFrame(updateCountdown);
    const timerId = window.setInterval(updateCountdown, 1000);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearInterval(timerId);
    };
  }, []);

  const daysValue = timeLeft ? formatCountdownValue("days", timeLeft.days) : "--";

  return (
    <div className="wedding-countdown" aria-label="예식까지 남은 시간">
      <p className="countdown-title">
        {wedding.groom.shortName} <span aria-hidden="true">♥</span> {wedding.bride.shortName} 결혼식까지
      </p>
      <div
        className="countdown-board"
        aria-label={
          timeLeft
            ? `${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초 남음`
            : "남은 시간 계산 중"
        }
      >
        <div className="countdown-day-pill" aria-hidden="true">
          <span className="countdown-day-prefix">D-</span>
          <span className="countdown-day-value">
            <CountdownValue value={daysValue} />
          </span>
          <span className="countdown-day-unit">Days</span>
        </div>
        <div className="countdown-clock" aria-hidden="true">
          <div className="countdown-time-row">
            {timeUnits.map((unit, index) => {
              const value = timeLeft ? formatCountdownValue(unit.key, timeLeft[unit.key]) : "--";

              return (
                <Fragment key={unit.key}>
                  <span className="countdown-time-number">
                    <CountdownValue value={value} />
                  </span>
                  {index < timeUnits.length - 1 ? <span className="countdown-time-colon">:</span> : null}
                </Fragment>
              );
            })}
          </div>
          <div className="countdown-time-labels">
            {timeUnits.map((unit) => (
              <span key={unit.key}>{unit.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
