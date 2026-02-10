"use client";

import { ShowAdButton } from "@/features/ui/ShowAdButton";
import Link from "next/link";

const tools = [
  {
    href: "/tasbih",
    title: "Чётки",
    description: "Электронные чётки для зикра",
    icon: "📿",
  },
  {
    href: "/timer",
    title: "Таймер",
    description: "Ваш мини таймер",
    icon: "⏱",
  },
  {
    href: "/qibla",
    title: "Кибла",
    description: "Направление к КИБЛЕ",
    icon: "🕋",
  },
  {
    href: "/tasktracker",
    title: "Трекер задач",
    description: "Всё ближе к целям",
    icon: "🚩",
  },
  {
    href: "/azkar",
    title: "Азкары",
    description: "Читайте азкары",
    icon: "📖",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="w-[360px] p-6">
        <h1 className="text-center text-lg tracking-[0.3em] text-neutral-400 mb-3">
          <Link href="about">САДАКА-САГ1А</Link>
        </h1>
        <div className="flex justify-center gap-3 mb-2 items-center">
          <ShowAdButton className="sticky">Реклама</ShowAdButton>
        </div>

        <div className="space-y-4">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block rounded-3xl bg-neutral-900 border border-white/5 p-5 shadow-lg active:scale-[0.98] transition"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{tool.icon}</div>
                <div>
                  <div className="text-lg font-medium">{tool.title}</div>
                  <div className="text-sm text-neutral-400">
                    {tool.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-neutral-500">
          Простые инструменты для сосредоточения
        </p>
      </div>
    </div>
  );
}
