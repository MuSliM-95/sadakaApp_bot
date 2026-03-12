"use client";

import { useUserQuery } from "@/features/user/hooks/useUserQuery";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import Link from "next/link";
import { useEffect } from "react";
import { Gamepad2, Eye, Tags, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { saveActiveGame } from "@/store/game.slice";
import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";

export function Profile() {
  const { data } = useUserQuery();
  const dispatch = useAppDispatch();

  const startGame = (url: string | null) => {
    if (!url) return;
    dispatch(saveActiveGame({ url }));
  };

  const playedGames = useAppSelector((state) => state.game.playedGames);

  useEffect(() => {
    const webApp: any = window.Telegram?.WebApp;
    if (!webApp) return;
    webApp.ready();
    webApp.expand();
  }, []);

  return (
    <div
      className="min-h-screen bg-neutral-950 text-white px-4 pb-8"
    >
      <div className="max-w-md mx-auto space-y-8">
        <PlatformBackButton />
        {!data?.username && (
          <div className="flex items-center -mt-4 gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
            <AlertCircle className="w-4 h-4" />
            <span>
              Укажите <span className="font-semibold">@username</span> в
              настройках профиля Telegram
            </span>
          </div>
        )}
        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <Avatar className="w-24 h-24 border-4 border-white/10 shadow-xl">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={data?.first_name ?? "user"}
            />
            <AvatarFallback>
              {data?.username?.slice(0, 2) ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h2 className="text-xl font-semibold">
              {data?.first_name ?? data?.username ?? "User"}
            </h2>
            <p className="text-sm text-neutral-400">
              @{data?.username ?? "username"}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href={"/profile/tickets"}
            className="bg-neutral-900 border border-white/5 rounded-2xl p-5 text-center shadow-lg"
          >
            <Tags className="mx-auto mb-2 text-yellow-400" />
            <div className="text-2xl font-bold">{data?.ticketsCount}</div>
            <div className="text-xs text-neutral-400 mt-1">Билетов</div>
          </Link>

          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 text-center shadow-lg">
            <Eye className="mx-auto mb-2 text-purple-400" />
            <div className="text-2xl font-bold">{data?.adsCount}</div>
            <div className="text-xs text-neutral-400 mt-1">
              Просмотрено реклам
            </div>
          </div>
        </div>

        {/* PLAYED GAMES */}
        <div>
          <h3 className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
            <Gamepad2 size={16} className="mt-[0.6px]" />
            Мои игры
          </h3>

          <div className="space-y-3">
            {playedGames?.map((game, index) => {
              return (
                <Link
                  key={index}
                  href={game.href}
                  onClick={() => startGame(game.url)}
                  className="block bg-neutral-900 border border-white/5 rounded-2xl p-4 hover:bg-neutral-800 transition-colors"
                >
                  {game.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
