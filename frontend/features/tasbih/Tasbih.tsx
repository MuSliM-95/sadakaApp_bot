"use client";

import { useState } from "react";
import { BackButton } from "../ui/BackButton";
import { ShowAdButton } from "../ui/ShowAdButton";

const themes = {
  ring: "ring",
  beads: "beads",
} as const;

type Theme = keyof typeof themes;

export default function TasbihPage() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(100); // визуальная цель, не ограничение
  const [theme, setTheme] = useState<Theme>("ring");

  const progress = target ? Math.min((count / target) * 100, 100) : 0;
  const beads = Array.from({ length: target });

  return (
    <div className="min-h-screen flex text-white items-center justify-center bg-neutral-950">
      <ShowAdButton />
      <BackButton />
      <div className="relative w-[340px] rounded-[2.75rem] bg-neutral-900 border border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-6 text-white">
        <h1 className="text-center text-sm tracking-[0.3em] text-neutral-400 mb-6">
          TASBIH
        </h1>

        {/* RING THEME */}
        {theme === "ring" && (
          <div className="mb-8">
            <div className="relative mx-auto w-48 h-48">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgb(16 185 129)"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 88}
                  strokeDashoffset={
                    2 * Math.PI * 88 - (progress / 100) * 2 * Math.PI * 88
                  }
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-semibold">{count}</div>
                <div className="text-sm text-emerald-400">из {target}</div>
              </div>
            </div>
          </div>
        )}

        {/* BEADS THEME */}
        {theme === "beads" && (
          <div className="grid grid-cols-11 gap-2 mb-8 justify-items-center">
            {beads.slice(0, target).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all ${
                  i < count
                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                    : "bg-neutral-700"
                }`}
              />
            ))}
          </div>
        )}

        {/* Counter fallback */}
        {theme === "beads" && (
          <div className="text-center mb-6">
            <div className="text-5xl font-light tabular-nums">{count}</div>
            <div className="text-xs text-neutral-400">из {target}</div>
          </div>
        )}

        {/* Main button */}
        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-full py-6 rounded-3xl cursor-pointer bg-gradient-to-b from-neutral-100 to-neutral-300 text-neutral-950 text-xl font-medium active:scale-95 transition"
        >
          Нажать
        </button>

        {/* Controls */}
        <div className="mt-4 flex justify-between items-center text-xs text-neutral-400">
          <button
            onClick={() => setCount(0)}
            className="px-3 py-1 rounded-full cursor-pointer bg-white/5"
          >
            Сброс
          </button>

          {/* Theme switch */}
          <div className="flex gap-1 text-xs">
            <button
              onClick={() => setTheme("ring")}
              className={`px-3 py-1 cursor-pointer rounded-full ${
                theme === "ring" ? "bg-white text-black" : "bg-white/10"
              }`}
            >
              Кольцо
            </button>
            <button
              onClick={() => setTheme("beads")}
              className={`px-3 py-1 cursor-pointer rounded-full ${
                theme === "beads" ? "bg-white text-black" : "bg-white/10"
              }`}
            >
              Бусины
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
