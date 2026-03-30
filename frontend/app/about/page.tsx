"use client";

import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";
import { Gift, Gamepad2, Ticket, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 pb-20">
      <div className="max-w-md mx-auto flex flex-col pt-2">
        {/* Верхняя навигация */}
        <div className="mb-10">
          <PlatformBackButton />
        </div>

        {/* ГЛАВНЫЙ ЗАГОЛОВОК (С КИРИЛЛИЦЕЙ) */}
        <header className="mb-14 border-l-2 border-yellow-500 pl-4">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            WayGame(Наши игры)
          </h1>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Официальная игровая платформа внутри мессенджера Telegram.
          </p>
        </header>

        <main className="flex flex-col gap-10">
          {/* Раздел 1 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-white/90">
              <Gamepad2 size={18} className="text-yellow-500" />
              <h2 className="text-lg font-semibold uppercase tracking-wider text-sm">
                Геймплей
              </h2>
            </div>
            <p className="text-neutral-400 text-[13px] leading-relaxed border-l border-white/10 pl-5">
              Доступ к коллекции HTML5-игр осуществляется мгновенно. Мы
              обеспечиваем стабильную работу игровых сессий без необходимости
              установки стороннего ПО.
            </p>
          </section>

          {/* Раздел 2 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-white/90">
              <Ticket size={18} className="text-yellow-500" />
              <h2 className="text-lg font-semibold uppercase tracking-wider text-sm">
                Ресурсы
              </h2>
            </div>
            <p className="text-neutral-400 text-[13px] leading-relaxed border-l border-white/10 pl-5">
              Внутренняя система билетов позволяет пользователям получать доступ
              к контенту за счет взаимодействия с рекламными материалами
              партнеров.
            </p>
          </section>

          {/* Раздел 3 */}
          <section className="space-y-3">
            <div className="flex items-center gap-3 text-white/90">
              <Gift size={18} className="text-yellow-500" />
              <h2 className="text-lg font-semibold uppercase tracking-wider text-sm">
                Программа лояльности
              </h2>
            </div>
            <p className="text-neutral-400 text-[13px] leading-relaxed border-l border-white/10 pl-5">
              Активные игроки участвуют в автоматизированных розыгрышах. Система
              прозрачно фиксирует достижения и формирует глобальный рейтинг.
            </p>
          </section>

          {/* Раздел 4 (Важно для юр. чистоты) */}
          <section className="mt-4 p-4 rounded-2xl bg-neutral-900/30 border border-white/5 flex gap-4 items-start">
            <ShieldCheck
              size={20}
              className="text-neutral-600 shrink-0 mt-0.5"
            />
            <p className="text-[11px] text-neutral-500 italic">
              Платформа функционирует в соответствии с правилами Telegram и
              действующим законодательством. Все игровые механики являются
              виртуальными.
            </p>
          </section>
        </main>

        <footer className="mt-20 opacity-20">
          <div className="text-[9px] font-mono tracking-[0.3em] uppercase">
            WayGame Service Engine
          </div>
        </footer>
      </div>
    </div>
  );
}
