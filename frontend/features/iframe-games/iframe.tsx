"use client";

import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks"; // путь к твоему хуку
import { BackButton } from "@/features/ui/BackButton";
import { Platform } from "@/shared/types/global.types";
import { FullscreenButton } from "@/shared/components/ui/fullscreenButton";
import {
  gameAdaTimerTick,
  savePlatform,
  startCooldown,
} from "@/store/ad.slice";
import { useAdsgram } from "@/features/ads/useAdsgram";
import { AdsInfoBanner } from "@/shared/components/ui/ads.info.banner";
import { saveActiveGame, saveGame } from "@/store/game.slice";

const games = [
  {
    id: 1,
    slug: "flappy",
    title: "Flappy Bird",
    url: "https://nebez.github.io/floppybird/",
    description:
      "Простая игра Flappy Bird. Управляй птичкой и избегай препятствий.",
  },
  {
    id: 2,
    slug: "merge-squad",
    title: "Merge Squad 2048",
    url: "https://www.madkidgames.com/games/merge-squad-2048",
    description:
      "Соединяй элементы в игре Merge Squad и достигай новых рекордов.",
  },
  {
    id: 3,
    slug: "block-blast-puzzle-game",
    title: "Block Blast",
    url: "https://www.madkidgames.com/games/block-blast-puzzle-game",
    description: "Собирай блоки и решай головоломки в Block Blast.",
  },
];

export default function IframeGames() {
  const dispatch = useAppDispatch();

  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  const activeGame = useAppSelector((state) => state.game.activeGame);
  const platform = useAppSelector((state) => state.ad.platform);
  const secondsGameLeft = useAppSelector((state) => state.ad.secondsGameLeft);
  const cooldownGame = useAppSelector((state) => state.ad.cooldownGame);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const onReward = useCallback(() => {
    const date = Date.now() + 60 * 1000;
    dispatch(startCooldown({ timer: date, type: "game" }));
  }, [dispatch]);

  useEffect(() => {
    if (!cooldownGame) return;

    const interval = setInterval(() => {
      dispatch(gameAdaTimerTick());
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownGame, dispatch]);

  const onError = useCallback(() => {
    // setAds(false);
  }, []);

  const { showAd, isPreparing, countdown } = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID_INIT!,
    onReward,
    onError,
  });

  // Отслеживаем ориентацию / размеры экрана
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", checkOrientation);
    checkOrientation(); // сразу проверим
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  // 1️⃣ Инициализация (один раз)
  useEffect(() => {
    const webApp: any = window.Telegram?.WebApp;
    if (!webApp) return;
    const platform = webApp.platform;

    dispatch(savePlatform(platform));

    webApp.ready();
    webApp.expand();

    setIsFullscreen(webApp.isFullscreen);

    const handler = () => {
      setIsFullscreen(webApp.isFullscreen);
    };

    webApp.onEvent("fullscreenChanged", handler);

    return () => {
      webApp.offEvent("fullscreenChanged", handler);
    };
  }, []);

  // 2️⃣ Реакция на изменение redux
  useEffect(() => {
    const webApp: any = window.Telegram?.WebApp;
    if (!webApp) return;

    if (fullscreen && !webApp.isFullscreen) {
      webApp.requestFullscreen?.();
    }

    if (!fullscreen && webApp.isFullscreen) {
      webApp.exitFullscreen?.();
    }
  }, [fullscreen]);

  // Определяем, нужно ли показывать баннер
  const showBanner =
    (platform === Platform.TDESKTOP && !fullscreen) ||
    (platform !== Platform.TDESKTOP && !isLandscape);

  const startGame = (url: string, title: string, id: number) => {
    if (secondsGameLeft <= 0) {
      showAd();
    }
    dispatch(saveGame({ id, name: title, href: "/games", url }));
    dispatch(saveActiveGame({ url }));
    // setActiveGame(url);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} />
      <BackButton />
      <h1 className="text-5xl font-bold mb-10 text-center tracking-wide">
        Мини-Игры
      </h1>

      {/* Сетка карточек игр */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {games.map((game) => (
          <div
            key={game.id}
            className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl hover:scale-105 transform transition duration-300 cursor-pointer border-2 border-gray-800 hover:border-indigo-500"
            onClick={() => startGame(game.url, game.title, game.id)}
          >
            {/* Мини-превью игры */}
            <div className="w-full h-48 bg-black overflow-hidden">
              <iframe
                src={game.url}
                className="w-full h-full pointer-events-none scale-90"
                frameBorder="0"
              ></iframe>
            </div>

            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-gray-400 text-sm">{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно с игрой */}
      {activeGame && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50 animate-fadeIn">
          {/* Закрытие */}
          {showBanner && (
            <div className="flex justify-start p-1">
              <button
                className="text-white font-bold cursor-pointer hover:text-red-500 transition"
                onClick={() => dispatch(saveActiveGame({ url: null }))}
              >
                Выйти
              </button>
            </div>
          )}

          {/* Баннер подсказки */}
          {showBanner && (
            <div className="flex items-center justify-center bg-gray-800 bg-opacity-90 text-yellow-300 py-2 text-center text-sm font-medium mb-2 animate-fadeIn">
              {platform === Platform.TDESKTOP
                ? "💻 Для лучшего опыта: попробуйте полноэкранный режим."
                : "📱 Для лучшего опыта: попробуйте развернуть телефон."}
            </div>
          )}

          {/* iframe игры */}
          <iframe
            src={activeGame}
            className="flex-1 w-full animate-fadeIn"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <FullscreenButton isFullscreen={isFullscreen} />
    </div>
  );
}
