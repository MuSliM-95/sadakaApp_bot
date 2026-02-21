"use client";

import { ShowAdButton } from "@/features/ads/ShowAdButton";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect } from "react";

const tools = [
  {
    href: "/game",
    title: "MOSAIC.PRO",
    description: "Отдохни немного",
    icon: "🧠",
  },
  // {
  //   href: "/game2",
  //   title: "MOSAIC.PRO",
  //   description: "Отдохни немного",
  //   icon: "🧠",
  // },
];

export default function HomePage() {
  useEffect(() => {
    const webApp: any = window.Telegram?.WebApp;
    if (!webApp) return;
    webApp.ready();
    webApp.expand(); // Разворачивает приложение на максимум (высокое окно)
    
    // В новых версиях API Telegram (платформа 7.0+)
    if (webApp.requestFullscreen) {
      webApp.requestFullscreen(); // Настоящий полноэкранный режим без статус-бара
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md p-6 flex flex-col justify-between h-[500px]">
        {/* Заголовок */}
        <h1 className="text-center text-lg tracking-[0.3em] text-neutral-400 mb-4 hover:text-white transition-colors">
          <Link href="/about">INZARE</Link>
        </h1>

        {/* Кнопка рекламы */}
        <div
          className={cn(
            "flex justify-center rounded-3xl shadow-lg transition-transform active:scale-[0.98] bg-gradient-to-r from-purple-600 to-indigo-600 p-1 mb-6"
          )}
        >
          <ShowAdButton className="w-full p-4 h-full justify-center text-white font-bold text-sm rounded-3xl">
            {/* Посмотреть рекламу */}
          </ShowAdButton>
        </div>

        {/* Инструменты */}
        <div className="space-y-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-3xl bg-neutral-900 border border-white/5 p-5 shadow-lg transition-transform duration-200 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl transition-transform group-hover:rotate-12">
                  {tool.icon}
                </div>
                <div>
                  <div className="text-lg font-semibold transition-colors group-hover:text-white">
                    {tool.title}
                  </div>
                  <div className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors">
                    {tool.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Подпись */}
        <p className="mt-10 text-center text-xs text-neutral-500">
          Простые инструменты для сосредоточения
        </p>
      </div>
    </div>
  );
}
