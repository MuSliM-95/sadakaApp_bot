import { ShowAdButton } from "@/features/ui/ShowAdButton";

export default function AdvertisingPage() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Контейнер рекламного блока */}
      <div className="relative group overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 transition-all duration-300 hover:border-indigo-500/50">
        {/* Метка "Реклама" */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-200/80 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 rounded">
            Ad / Реклама
          </span>
        </div>

        {/* Область для Видео/Iframe */}
        <div className="aspect-video w-full flex items-center justify-center">
          {/* Сюда вставляется скрипт или iframe твоей рекламной сети */}
          <div className="text-center space-y-3">
            <div className="h-[40px] mx-auto mb-2 opacity-20 dark:opacity-40">
              <ShowAdButton />

            </div>
            <p className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">
              Здесь будет загружено видео...
            </p>
          </div>

          {/* Пример интеграции внешнего плеера (раскомментировать при вставке кода) */}
          {/* 
          <iframe 
            src="URL_РЕКЛАМНОГО_ВИДЕО" 
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media" 
            allowFullScreen
          /> 
          */}
        </div>

        {/* Нижняя панель (опционально, для кликабельности) */}
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                W
              </span>
            </div>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
              WayGames Special Offer
            </span>
          </div>
        </div>
      </div>

      {/* Подсказка для пользователя */}
      <p className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-600">
        Реклама помогает нам поддерживать серверы бесплатными
      </p>
    </div>
  );
}
