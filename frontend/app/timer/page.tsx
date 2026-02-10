"use client";

import { BackButton } from "@/features/ui/BackButton";
import { ShowAdButton } from "@/features/ui/ShowAdButton";
import { useEffect, useRef, useState } from "react";

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const presets = [5, 10, 15, 30]; // minutes

export default function TimerPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(10 * 60);
  const [secondsLeft, setSecondsLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState("");
  const [timerAudio, setTimerAudio] = useState(false);

  useEffect(() => {
    setSecondsLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      return;
    }

    const id = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (secondsLeft <= 0 && running) {
      setRunning(false);

      // вибрация
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);

      // звук

      if (!audioRef.current) {
        audioRef.current = new Audio("/sounds/ding.mp3");
      }

      audioRef.current.onended = () => {
        setTimerAudio(false);
      };

      audioRef.current.play();
      setTimerAudio(true);
    }
  }, [secondsLeft, running]);

  const applyCustomTime = () => {
    const minutes = Number(customMinutes);
    if (!Number.isFinite(minutes) || minutes <= 0) return;
    setDuration(Math.floor(minutes * 60));
    setRunning(false);
    setCustomMinutes("");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <ShowAdButton />
      <BackButton />
      <div className="w-[360px] p-6">
        <h1 className="text-center text-sm tracking-[0.3em] text-neutral-400 mb-8">
          TIMER
        </h1>

        {/* Time display */}
        <div className="text-center mb-10">
          <div className="text-7xl font-light tabular-nums">
            {formatTime(secondsLeft)}
          </div>
        </div>

        {/* Presets */}
        <div className="flex justify-center flex-wrap gap-2 mb-6">
          {presets.map((m) => (
            <button
              key={m}
              onClick={() => {
                setDuration(m * 60);
                setRunning(false);
              }}
              className={`px-4 py-2 rounded-full text-sm transition ${
                duration === m * 60 ? "bg-white text-black" : "bg-white/10"
              }`}
            >
              {m} мин
            </button>
          ))}
        </div>

        {/* Custom time */}
        <div className="flex items-center gap-2 mb-8">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Минуты"
            value={customMinutes}
            onChange={(e) => setCustomMinutes(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-white/5 text-white placeholder:text-neutral-500 focus:outline-none"
          />
          <button
            onClick={applyCustomTime}
            className="px-4 py-3 rounded-2xl bg-white text-black text-sm"
          >
            ОК
          </button>
        </div>

        {/* Main control */}
        {timerAudio ? (
          <button
            onClick={() => {
              setTimerAudio(false), audioRef.current?.pause();
            }}
            className="w-full py-6 rounded-3xl bg-gradient-to-b from-neutral-100 to-neutral-300 text-neutral-950 text-xl font-medium active:scale-95 transition"
          >
            Стоп
          </button>
        ) : (
          <button
            onClick={() => setRunning((r) => !r)}
            className="w-full py-6 rounded-3xl bg-gradient-to-b from-neutral-100 to-neutral-300 text-neutral-950 text-xl font-medium active:scale-95 transition"
          >
            {running ? "Пауза" : "Старт"}
          </button>
        )}

        {/* Reset */}
        <button
          onClick={() => {
            setRunning(false);
            setSecondsLeft(duration);
          }}
          className="mt-4 w-full py-3 rounded-2xl bg-white/5 text-sm"
        >
          Сброс
        </button>

        <p className="mt-10 text-center text-xs text-neutral-500">
          Минимальный таймер без отвлечений
        </p>
      </div>
    </div>
  );
}
