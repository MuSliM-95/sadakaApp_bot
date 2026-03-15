"use client";

import { ShowAdButton } from "@/features/ads/ShowAdButton";
import { useTelegramWebApp } from "@/features/ads/useTelegramWebApp";
import { useTelegramAuth } from "@/features/auth/hooks/useTelegramAuth";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { FullscreenButton } from "@/shared/components/ui/fullscreenButton";
import { Platform } from "@/shared/types/global.types";
import { saveUser } from "@/store/ad.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Tags } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const tools = [
  {
    href: "/games/puzzle",
    title: "MOSAIC.PRO",
    description: "Головоломка",
    icon: "🧠",
  },
  {
    href: "/games",
    title: "Другие игры",
    description: "Отдохни немного",
    icon: "🕹",
  },
];

export default function HomePage() {
  useTelegramAuth();
  const dispatch = useAppDispatch();

  const tickets = useAppSelector((state) => state.ad.tickets);
  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  const platform = useAppSelector((state) => state.ad.platform);
  const { data: user } = useUserQuery();

  useEffect(() => {
    if (!user) return;
    dispatch(saveUser(user));
  }, []);

  const { isFullscreen } = useTelegramWebApp(fullscreen);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex justify-center px-4 pt-20 pb-8">
      <div className="w-full max-w-md flex flex-col justify-between">
        <div
          className={cn(
            "flex justify-between items-center gap-3 p-2 bg-neutral-900/60 backdrop-blur-md rounded-full border border-white/10 shadow-md",
            platform !== Platform.TDESKTOP && fullscreen ? "mt-8" : "-mt-6"
          )}
        >
          {/* Левая часть: аватар и имя */}
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition"
          >
            <Avatar className="w-9 h-9">
              <AvatarImage
                alt="user avatar"
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>
                {user?.username?.slice(0, 1) ?? "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-neutral-200 truncate max-w-[120px]">
              {user?.first_name ?? user?.username ?? "User"}
            </span>
          </Link>

          {/* Правая часть: рейтинг и билеты */}
          <div className="flex items-center gap-3">
            <Link
              href={`/rating?id=${user?.id}`}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 hover:bg-yellow-400/30 text-yellow-400 transition"
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
              href={`/profile/tickets`}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 hover:bg-blue-400/20 hover:border-blue-400 transition-all duration-200"
              title="Билеты"
            >
              <Tags size={16} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-200">
                {tickets}
              </span>
            </Link>
          </div>
        </div>

        {/* TITLE */}
        <div
          className={cn(
            "text-center mt-3 mb-3",
            !fullscreen && platform === Platform.TDESKTOP && "mt-10 mb-10"
          )}
        >
          <Link
            href="/about"
            className="block text-lg tracking-[0.35em] text-neutral-500 hover:text-white transition-colors"
          >
            INZARE
          </Link>

          <span className="block text-ls text-neutral-600 tracking-widest mt-1">
            (Удивительный)
          </span>
        </div>

        {/* MAIN CARD */}
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col gap-6">
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

          {/* Tools */}
          <div className="space-y-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group block rounded-2xl bg-neutral-800 border border-white/5 p-4 shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl transition-transform group-hover:rotate-12">
                    {tool.icon}
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{tool.title}</div>
                    <div className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                      {tool.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <p className="mt-10 text-center text-xs text-neutral-600">
          Простые инструменты для сосредоточения
        </p>
      </div>
      {/* DESKTOP FULLSCREEN BUTTON */}
      <FullscreenButton isFullscreen={isFullscreen} />
    </div>
  );
}
