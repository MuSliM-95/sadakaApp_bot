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
          <span className="font-semibold">САДАКА-САГ1А</span> — это
          социально-благотворительный проект, направленный на поддержку
          мусульманской уммы.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-white/90 mb-3 break-words">
          В рамках проекта реализуются различные программы и сервисы, призванные
          облегчить соблюдение религии.
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-white/90 break-words">
          Часть получаемого дохода направляется на благотворительность и помощь
          нуждающимся.
        </p>
      </div>
    </section>
  );
}
