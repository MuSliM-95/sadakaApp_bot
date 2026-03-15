"use client";

import { BackButton } from "@/features/ui/BackButton";

export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
      <div className="max-w-2xl bg-neutral-950/70 backdrop-blur rounded-2xl p-6 sm:p-8 shadow-lg">
        <BackButton />
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          О проекте
        </h1>
        <div className="space-y-4 text-sm sm:text-base lg:text-lg leading-relaxed">
          <p>
            <strong>CADAKA (Милостыня)</strong> — это небольшой стартовый MVP в
            формате Telegram-бота, где пользователи могут играть в мини-игры и
            одновременно участвовать в благотворительности.
          </p>

          <p>
            На платформе размещаются игры и реклама, а средства, полученные от
            рекламных показов, направляются на благотворительные цели.
          </p>

          <p>
            Платформа проста в использовании и создана для быстрого запуска и
            тестирования идеи объединения развлечений и помощи нуждающимся.
          </p>

          <p>
            В будущем планируется расширение функционала: добавление новых игр,
            улучшение системы пожертвований и прозрачной статистики
            использования средств.
          </p>
        </div>
      </div>
    </section>
  );
}
