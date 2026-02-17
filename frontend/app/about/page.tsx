"use client";

import { BackButton } from "@/features/ui/BackButton";

export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <BackButton />
      <div className="max-w-2xl bg-neutral-950/70 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          О проекте
        </h1>

        <p className="text-base sm:text-lg leading-relaxed text-white/90 mb-3 break-words">
          <span className="font-semibold">Inzare</span> — это небольшой стартовый MVP в формате <strong>Telegram-бота</strong>, где пользователи могут играть в головоломку.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-white/90 mb-3 break-words">
          Платформа проста в использовании и ориентирована на быстрый запуск и тестирование идеи.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-white/90 break-words">
          В будущем планируется расширение функционала с новыми играми и возможностями для пользователей.
        </p>
      </div>
    </section>
  );
}
