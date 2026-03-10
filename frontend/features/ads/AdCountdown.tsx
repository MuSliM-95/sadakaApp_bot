"use client";

import { useEffect, useState } from "react";

interface Props {
  onFinish: () => void;
  duration?: number;
}

export function AdCountdown({ onFinish, duration = 5 }: Props) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time <= 0) {
      onFinish();
      return;
    }

    const id = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [time, onFinish]);

  const progress = (time / duration) * 283; // длина круга

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-black/70 backdrop-blur-md 
                    animate-fadeIn">

      <div className="text-center text-white space-y-6 scale-100 animate-scaleIn">

        <div className="text-xl font-semibold tracking-wide 
                        text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">
          Сейчас появится реклама
        </div>

        <div className="relative w-32 h-32 mx-auto">

          <svg className="transform -rotate-90" width="128" height="128">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray="283"
              strokeDashoffset={283 - progress}
              className="transition-all duration-1000 ease-linear"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center
                          text-3xl font-bold">
            {time}
          </div>

        </div>

      </div>
    </div>
  );
}