"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Platform } from "@/shared/types/global.types";
import { FullscreenButton } from "@/shared/components/ui/fullscreenButton";
import { gameAdaTimerTick, startCooldown } from "@/store/ad.slice";
import { useAdsgram } from "@/features/ads/useAdsgram";
import { AdsInfoBanner } from "@/shared/components/ui/ads.info.banner";
import { saveActiveGame, saveGame } from "@/store/game.slice";
import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";
import { useTelegramWebApp } from "../ads/useTelegramWebApp";
import { api } from "@/shared/api/instance.api";
import { BackButton } from "../ui/BackButton";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Game = {
  id: number;
  title: string;
  url: string;
  img: string;
  description?: string;
  categories: Category[];
};

const fetchGames = async (): Promise<Game[]> => {
  const res = await api.get<Game[]>("api/games");
  return res || [];
};

export default function GamesPage() {
  const dispatch = useAppDispatch();

  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  const activeGame = useAppSelector((state) => state.game.activeGame);
  const platform = useAppSelector((state) => state.ad.platform);
  const secondsGameLeft = useAppSelector((state) => state.ad.secondsGameLeft);
  const cooldownGame = useAppSelector((state) => state.ad.cooldownGame);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  // REWARD AD
  const onReward = useCallback(() => {
    const date = Date.now() + 240 * 1000;
    dispatch(startCooldown({ timer: date, type: "game" }));
  }, [dispatch]);

  const onError = useCallback(() => {}, []);

  const { showAd, isPreparing, countdown } = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID_INIT!,
    onReward,
    onError,
  });

  useEffect(() => {
    if (!cooldownGame) return;
    const interval = setInterval(() => {
      dispatch(gameAdaTimerTick());
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownGame, dispatch]);

  // ORIENTATION
  useEffect(() => {
    const checkOrientation = () =>
      setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", checkOrientation);
    checkOrientation();
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  const { isFullscreen } = useTelegramWebApp(fullscreen);

  const showBanner =
    (platform === Platform.TDESKTOP && !fullscreen) ||
    (platform !== Platform.TDESKTOP && !isLandscape);

  const startGame = (url: string, title: string, id: number) => {
    if (secondsGameLeft <= 0) showAd();

    dispatch(saveGame({ id, name: title, href: "/games", url }));
    dispatch(saveActiveGame({ url }));
  };

  const handlerExist = () => dispatch(saveActiveGame({ url: null }));

  if (isLoading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-500">Ошибка загрузки игр</div>;

  // UNIQUE CATEGORIES
  const categories =
    games?.reduce((acc: Category[], game) => {
      game.categories?.forEach((cat) => {
        if (!acc.find((c) => c.id === cat.id)) acc.push(cat);
      });
      return acc;
    }, []) || [];

  const filteredGames = activeCategory
    ? games?.filter((game) =>
        game.categories.some((c) => c.slug === activeCategory)
      )
    : games;

  return (
    <div className="p-4 space-y-6 bg-black text-white min-h-screen">
      <PlatformBackButton />

      <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} />

      {/* CATEGORIES */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1 rounded transition ${
            !activeCategory
              ? "bg-white text-black"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Все
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-3 py-1 rounded transition ${
              activeCategory === cat.slug
                ? "bg-white text-black"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* GAMES GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGames?.map((game) => (
          <div
            key={game.id}
            className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow hover:shadow-xl hover:scale-[1.02] transition cursor-pointer"
            onClick={() => startGame(game.url, game.title, game.id)}
          >
            <img
              src={game.img}
              alt={game.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{game.title}</h3>
              {game.description && (
                <p className="text-gray-400 text-xs mt-1">{game.description.slice(0, 60)} . . .</p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {game.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs bg-gray-800 px-2 py-0.5 rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GAME MODAL */}
      {activeGame && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50 animate-fadeIn">
          {showBanner && (
            <PlatformBackButton onclick={handlerExist}>
              <div className="flex justify-start px-2">
                <button
                  className="text-white font-bold cursor-pointer hover:text-red-500 transition"
                  onClick={handlerExist}
                >
                  Выйти
                </button>
              </div>
            </PlatformBackButton>
          )}

          {/* {showBanner && (
            <div className="flex items-center justify-center bg-gray-800 bg-opacity-90 text-yellow-300 py-2 text-center text-sm font-medium mb-2 animate-fadeIn">
              {platform === Platform.TDESKTOP ? (
                <div>
                  💻 Для лучшего опыта: попробуйте полноэкранный режим.{" "}
                  <FullscreenButton className="static px-2 py-1" isFullscreen={isFullscreen} />
                </div>
              ) : (
                "📱 Для лучшего опыта: попробуйте развернуть телефон."
              )}
            </div>
          )} */}

          {platform === Platform.TDESKTOP && !showBanner && (
            <FullscreenButton className="" isFullscreen={isFullscreen} />
          )}

          <iframe
            src={activeGame}
            className="flex-1 w-full animate-fadeIn"
            frameBorder="0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
