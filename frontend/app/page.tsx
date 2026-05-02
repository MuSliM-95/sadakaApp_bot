"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Platform } from "@/shared/types/global.types";
import { FullscreenButton } from "@/shared/components/ui/fullscreenButton";
import { saveActiveGame, saveGame } from "@/store/game.slice";
import { useTelegramWebApp } from "@/features/ads/useTelegramWebApp";
import { useTelegramAuth } from "@/features/auth/hooks/useTelegramAuth";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";
import { api } from "@/shared/api/instance.api";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Tags } from "lucide-react";
import Link from "next/link";
import { ShowAdButton } from "@/features/ads/ShowAdButton";
import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";
import { Category, Game } from "@/features/iframe-games/types/types";
import PageLoader from "@/shared/components/ui/PageLoader";
import { ErrorMessage } from "@/shared/components/ui/ErrorMessage";
import { useTicketsQuery } from "@/features/tickets/hooks/useTicketsQuery";

const fetchGames = async (): Promise<Game[]> => {
  const res = await api.get<Game[]>("api/games");
  return res || [];
};

export default function HomeGamesPage() {
  useTelegramAuth();

  const dispatch = useAppDispatch();

  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  const platform = useAppSelector((state) => state.ad.platform);
  const activeGame = useAppSelector((state) => state.game.activeGame);

  const { data: currentUser } = useUserQuery();
  const { data: tickets } = useTicketsQuery();

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    // Проверяем, был ли уже запуск в этой сессии
    const isFirstLoad = !sessionStorage.getItem("app_initialized");

    if (isFirstLoad) {
      dispatch(saveActiveGame({ url: null }));

      // Помечаем, что первый запуск прошел
      sessionStorage.setItem("app_initialized", "true");
    }
  }, [dispatch]);

  // GAMES
  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  // ORIENTATION
  useEffect(() => {
    const media = window.matchMedia("(orientation: landscape)");

    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsLandscape(e.matches);
    };

    handler(media); // initial

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const { isFullscreen } = useTelegramWebApp(fullscreen);

  const startGame = (url: string, title: string, id: number) => {
    dispatch(saveGame({ id, name: title, href: "/", url }));
    dispatch(saveActiveGame({ url }));
  };

  const exitGame = () => dispatch(saveActiveGame({ url: null }));

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorMessage />;

  // categories
  const categories =
    games?.reduce((acc: Category[], game) => {
      game.categories?.forEach((cat) => {
        if (!acc.find((c) => c.id === cat.id)) acc.push(cat);
      });
      return acc;
    }, []) || [];

  const filteredGames = activeCategory
    ? games?.filter((g) => g.categories.some((c) => c.slug === activeCategory))
    : games;

  return (
    <div className="min-h-screen bg-black text-white pb-12 px-3 pt-4">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        {/* HEADER */}
        <div
          className={cn(
            "flex items-center justify-between",
            platform !== Platform.TDESKTOP ? "mt-22" : "mt-5"
          )}
        >
          <Link href="/profile" className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {currentUser?.username?.slice(0, 1) ?? "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <div className="text-xs text-neutral-400">
                @{currentUser?.username ?? "user"}
              </div>
              <div className="text-sm font-semibold">
                {currentUser?.first_name ?? "Player"}
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/rating?id=${currentUser?.id}`}
              className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 hover:bg-yellow-400/30 text-yellow-400 transition"
              title="Рейтинг"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"
                />
              </svg>
            </Link>
            <Link
              href="/profile/tickets"
              className="flex items-center gap-2 px-2 py-1 rounded-xl bg-white/5 border border-white/10"
            >
              <Tags size={14} />
              <span className="text-sm">{tickets}</span>
            </Link>
          </div>
        </div>

        {/* Ad Button */}
        <div
          className={cn(
            "rounded-3xl bg-gradient-to-r p-[2px] transition-transform active:scale-[0.97]"
          )}
        >
          <ShowAdButton className="w-full p-4 rounded-3xl bg-neutral-950 text-white font-bold text-sm hover:opacity-90 transition-opacity">
            Получить билет
          </ShowAdButton>
        </div>
        {/* CONTEST GAME (COMING SOON) */}
        <div className="relative rounded-2xl border border-white/10 bg-neutral-900/80 p-4 overflow-hidden group">
          {/* subtle animated light */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-yellow-500/10 via-transparent to-purple-500/10" />

          {/* content */}
          <div className="relative z-10">
            {/* header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-yellow-500/70 font-bold">
                Contest
              </span>

              <span className="text-[10px] font-semibold text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-md animate-pulse">
                Тестирование
              </span>
            </div>

            {/* title */}
            <div className="mb-4">
              <div className="text-base font-semibold text-white">
                Конкурсная игра
              </div>
              <div className="text-xs text-neutral-400 mt-1">
                Набирай очки и поднимайся в рейтинге
              </div>
            </div>

            {/* buttons */}
            <div className="flex items-center gap-2">
              {/* START (disabled) */}
              <Link
                href={"/games"}
                className="flex-1 py-2 text-center rounded-xl bg-yellow-500/20 text-yellow-500 text-xs font-bold"
              >
                Старт
              </Link>

              {/* SOON */}
              <div className="px-3 py-2 rounded-xl bg-white/5 text-xs font-semibold text-neutral-400">
                SOON
              </div>
            </div>

            {/* animated progress */}
            <div className="mt-4 h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-yellow-500/60 animate-[progressMove_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} /> */}

        {/* MODERN CATEGORIES */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-2xl text-xs font-bold transition-all",
              !activeCategory
                ? "bg-white text-black shadow-lg shadow-white/10"
                : "bg-neutral-900 text-neutral-500 border border-white/5"
            )}
          >
            Все игры
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={cn(
                "whitespace-nowrap px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border",
                activeCategory === cat.slug
                  ? "bg-yellow-500 border-yellow-400 text-black"
                  : "bg-neutral-900 text-neutral-500 border-white/5"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* GAMES */}
        <div className="grid grid-cols-2 gap-3">
          {filteredGames?.map((game) => (
            <div
              key={game.id}
              onClick={() => startGame(game.url, game.title, game.id)}
              className="bg-neutral-900 rounded-2xl overflow-hidden"
            >
              <img src={game.img} className="w-full h-28 object-cover" />

              <div className="p-2 text-sm font-semibold">{game.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* GAME */}
      {activeGame && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          <div className="flex justify-between items-center">
            {!(platform !== Platform.TDESKTOP && isLandscape) && (
              <PlatformBackButton onclick={exitGame}>
                {platform === Platform.TDESKTOP && (
                  <FullscreenButton
                    className="sticky"
                    isFullscreen={isFullscreen}
                  />
                )}
              </PlatformBackButton>
            )}
          </div>
          <iframe
            src={`${activeGame}?clid=${process.env.NEXT_PUBLIC_CLID}`}
            className="flex-1 w-full border-none"
            allow="fullscreen; accelerometer; camera; clipboard-read; clipboard-write; screen-wake-lock; speaker-selection; web-share; geolocation; gyroscope; microphone; xr-spatial-tracking; autoplay; encrypted-media; picture-in-picture; payment; publickey-credentials-get; publickey-credentials-create; storage-access; attribution-reporting; browsing-topics"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-3 flex flex-col items-center gap-2 border-t border-white/5 pt-2">
        {/* Компактная навигация в один ряд */}
        <div className="flex items-center gap-2">
          <Link
            href="/terms"
            className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-[10px] font-bold text-neutral-500 hover:text-white transition-colors"
          >
            ПРАВОВАЯ ИНФОРМАЦИЯ-
          </Link>

          <span className="text-neutral-800 text-[10px]">•</span>

          <Link
            href="/about"
            className="px-3 py-1.5 rounded-xl bg-white/[0.03] text-[10px] font-bold text-neutral-500 hover:text-white transition-colors"
          >
            О НАС
          </Link>
        </div>

        {/* Нижняя строчка: версия и копирайт */}
        <div className="flex items-center gap-3 opacity-30">
          <span className="text-[9px] font-mono tracking-widest">
            WayGames v2.0
          </span>
          <div className="w-[1px] h-2 bg-white/20" />
          <span className="text-[9px] font-medium uppercase tracking-tight">
            © {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
}
