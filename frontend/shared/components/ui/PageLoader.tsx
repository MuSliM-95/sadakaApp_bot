"use client";

export default function PageLoader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
      {/* Кружок загрузки */}
      <div className="w-16 h-16 border-4 border-t-4 border-t-emerald-400 border-gray-700 rounded-full animate-spin mb-6" />
      
      {/* Текст */}
      <p className="text-neutral-400 text-sm animate-pulse">
        Загрузка страницы...
      </p>

      {/* Дополнительно можно добавить несколько полосок skeleton */}
      <div className="mt-6 space-y-3 w-48">
        <div className="h-3 bg-neutral-800 rounded animate-pulse" />
        <div className="h-3 bg-neutral-800 rounded animate-pulse" />
        <div className="h-3 bg-neutral-800 rounded animate-pulse" />
      </div>
    </div>
  );
}