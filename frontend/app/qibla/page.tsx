"use client";

import { BackButton } from "@/features/ui/BackButton";
import { ShowAdButton } from "@/features/ui/ShowAdButton";
import { useEffect, useState } from "react";

const MECCA = { lat: 21.4225, lon: 39.8262 };

function getQiblaDirection(lat: number, lon: number) {
  const φ1 = (lat * Math.PI) / 180;
  const λ1 = (lon * Math.PI) / 180;
  const φ2 = (MECCA.lat * Math.PI) / 180;
  const λ2 = (MECCA.lon * Math.PI) / 180;
  const Δλ = λ2 - λ1;

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  const brng = ((θ * 180) / Math.PI + 360) % 360;
  return brng;
}

export default function QiblaPage() {
  const [qibla, setQibla] = useState(0);
  const [alpha, setAlpha] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setQibla(getQiblaDirection(pos.coords.latitude, pos.coords.longitude));
    });

    const handler = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) setAlpha(e.alpha);
    };
    window.addEventListener("deviceorientation", handler);

    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const rotation = (qibla - alpha + 360) % 360;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <ShowAdButton />
      <BackButton />
      <div className="relative w-80 h-80 rounded-full bg-gradient-to-tr from-neutral-950 to-neutral-900 shadow-2xl flex items-center justify-center">
        {/* Outer Compass Circle with Glow */}
        <div className="absolute w-80 h-80 rounded-full border-4 border-white/10 flex items-center justify-center shadow-inner animate-[pulse_3s_infinite]">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1.5 h-5 ${
                i % 3 === 0 ? "bg-white/70" : "bg-white/30"
              } rounded-full`}
              style={{ transform: `rotate(${i * 15}deg) translateY(-38px)` }}
            />
          ))}
        </div>

        {/* Qibla Arrow with Gradient, Glow and Smooth Animation */}
        <div
          className="absolute w-5 h-48 rounded-full shadow-2xl origin-bottom transition-transform duration-700 ease-out bg-gradient-to-t from-emerald-400 to-emerald-200 animate-[pulse_2s_infinite]"
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        {/* Center Dot with Soft Glow */}
        <div className="w-8 h-8 bg-emerald-400 rounded-full shadow-[0_0_25px_4px_rgba(16,185,129,0.8)]" />

        {/* Qibla Label with Floating Animation */}
        <div className="absolute bottom-6 text-center w-full">
          <span className="text-sm text-emerald-400 font-bold animate-bounce">
            Кибла →
          </span>
        </div>

        {/* Decorative Glow Ring Pulsing */}
        <div className="absolute w-80 h-80 rounded-full border-2 border-emerald-400/30 animate-[ping_2.5s_infinite]" />
      </div>

      <p className="mt-6 text-center text-base text-white/70 px-6">
        Стрелка плавно и точно указывает направление на Киблу
      </p>
    </div>
  );
}
