"use client";

import { useState } from "react";
import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";
import { cn } from "@/lib/utils";

export default function LegalPage() {
  const [tab, setTab] = useState<"terms" | "privacy">("terms");

  return (
    <div className="min-h-screen bg-black text-white px-6 pb-24 font-sans">
      <div className="max-w-md mx-auto flex flex-col gap-6">
        <PlatformBackButton />

        <header>
          <h1 className="text-2xl font-bold mb-4">Юридическая информация</h1>
          {/* Переключатель табов */}
          <div className="flex p-1 bg-neutral-900 rounded-2xl border border-white/5">
            <button
              onClick={() => setTab("terms")}
              className={cn(
                "flex-1 py-2 text-xs cursor-pointer rounded-xl transition",
                tab === "terms" ? "bg-white text-black font-semibold" : "text-neutral-400"
              )}
            >
              Условия использования
            </button>
            <button
              onClick={() => setTab("privacy")}
              className={cn(
                "flex-1 py-2 text-xs cursor-pointer rounded-xl transition",
                tab === "privacy" ? "bg-white text-black font-semibold" : "text-neutral-400"
              )}
            >
              Конфиденциальность
            </button>
          </div>
        </header>

        <div className="text-sm text-neutral-400 leading-relaxed space-y-6 overflow-y-auto">
          {tab === "terms" ? (
            <article className="space-y-4 animate-in fade-in duration-300">
              <section>
                <h2 className="text-white font-semibold mb-2">1. Общие положения</h2>
                <p>Использование данного Telegram Mini App означает ваше полное согласие с данными условиями. Платформа предоставляет доступ к HTML5-играм и системе вознаграждений за просмотр рекламы.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold mb-2">2. Игровой процесс и Билеты</h2>
                <p>Билеты являются виртуальными единицами внутри приложения и не имеют денежной стоимости. Просмотр рекламы дает право на получение билета для доступа к играм.</p>
              </section>
              <section>
                <h2 className="text-white font-semibold mb-2">3. Ограничение ответственности</h2>
                <p>Сервис предоставляется «как есть». Администрация не несет ответственности за технические сбои на стороне Telegram или рекламных сетей (Adsgram).</p>
              </section>
            </article>
          ) : (
            <article className="space-y-4 animate-in fade-in duration-300">
              <section>
                <h2 className="text-white font-semibold mb-2">Обработка данных (ФЗ-152)</h2>
                <p>Мы обрабатываем только те данные, которые передает Telegram API: ваш ID, имя пользователя и публичное имя (first_name).</p>
              </section>
              <section>
                <h2 className="text-white font-semibold mb-2">Цели сбора</h2>
                <ul className="list-disc pl-4 space-y-2 text-xs">
                  <li>Идентификация пользователя в системе рейтинга.</li>
                  <li>Сохранение игрового прогресса и баланса билетов.</li>
                  <li>Предотвращение фрода (накруток рекламы).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-white font-semibold mb-2">Третьи лица</h2>
                <p>Для показа рекламы используется сервис Adsgram. Мы не передаем ваши личные данные рекламным сетям, кроме анонимных технических идентификаторов.</p>
              </section>
              <p className="text-[10px] text-neutral-600 italic">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
