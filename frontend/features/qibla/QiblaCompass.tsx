"use client";
import { useEffect, useState } from "react";
import { getQiblaDirection } from "@masaajid/qibla";


export default function QiblaCompass() {
  const [rotation, setRotation] = useState(0);
  const [bearing, setBearing] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  // 1. Запрос координат и расчет угла Киблы
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const result = getQiblaDirection({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setBearing(result.bearing);
      },
      (err) => console.error("Ошибка геолокации:", err)
    );
  }, []);

  // 2. Функция активации датчиков (нужна для iOS)
  const startCompass = async () => {
    if (
      typeof (window as any).DeviceOrientationEvent?.requestPermission ===
      "function"
    ) {
      const permission = await (
        window as any
      ).DeviceOrientationEvent.requestPermission();
      if (permission === "granted") initSensor();
    } else {
      initSensor();
    }
  };

  const initSensor = () => {
    setIsActive(true);
    window.addEventListener(
      "deviceorientation",
      (e: any) => {
        // Получаем направление устройства (heading)
        console.log(e.webkitCompassHeading);

        const heading = e.webkitCompassHeading || Math.abs(e.alpha - 180);
        console.log(bearing);

        if (bearing !== null) {
          // Итоговый угол стрелки
          setRotation(bearing - heading);
        }
      },
      true
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white overflow-hidden">
      {/* Кнопка активации (если датчик еще не запущен) */}
      {!isActive && (
        <button
          onClick={startCompass}
          className="mb-8 z-10 px-6 py-2 bg-emerald-500 rounded-full font-bold animate-pulse"
        >
          Включить компас
        </button>
      )}

      {/* Контейнер компаса */}
      <div className="relative w-80 h-80 rounded-full bg-gradient-to-tr from-neutral-950 to-neutral-900 shadow-2xl flex items-center justify-center">
        {/* Внешнее кольцо с делениями */}
        <div className="absolute w-full h-full rounded-full border-4 border-white/10 flex items-center justify-center shadow-inner">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-4 ${
                i % 6 === 0 ? "bg-white/60 w-1.5 h-6" : "bg-white/20"
              }`}
              style={{ transform: `rotate(${i * 15}deg) translateY(-145px)` }}
            />
          ))}
        </div>

        {/* Контейнер стрелки (вращается целиком вокруг центра) */}
        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Сама стрелка (смещена вверх, чтобы низ был в центре) */}
          <div className="w-4 h-36 mb-36 rounded-full bg-gradient-to-t from-emerald-400 to-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.6)] animate-[pulse_2s_infinite]" />
        </div>

        {/* Центральная точка */}
        <div className="relative z-10 w-8 h-8 bg-emerald-400 rounded-full shadow-[0_0_25px_4px_rgba(16,185,129,0.8)] border-4 border-neutral-900" />

        {/* Подпись снизу (вращается вместе со стрелкой или зафиксирована) */}
        <div className="absolute top-[-30] text-center w-full">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 font-bold">
            Qibla
          </span>
        </div>

        {/* Пульсирующее декоративное кольцо */}
        <div className="absolute w-full h-full rounded-full border-2 border-emerald-400/20 animate-[ping_3s_infinite]" />
      </div>

      <p className="mt-8 text-center text-sm text-white/50 px-10 max-w-sm leading-relaxed">
        {bearing !== null
          ? `Угол направления: ${Math.round(rotation)}°`
          : "Определяем ваше местоположение..."}
      </p>
    </div>
  );
}
