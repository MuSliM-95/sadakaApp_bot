import { AdController, ShowPromiseResult } from "@/adsgram";
import { useCallback, useEffect, useRef } from "react";
import { useAdsMutation } from "./hooks/useAdsMutation";
export interface useAdsgramParams {
  blockId: string;
  onReward?: () => void;
  onError?: () => void;
}


export function useAdsgram({
  blockId,
  onReward,
  onError,
}: useAdsgramParams): () => Promise<void> {
  const AdControllerRef = useRef<AdController | undefined>(undefined);
  const { getApi } = useAdsMutation();

  // Функция для (пере)инициализации
  const initAd = useCallback(() => {
    if (window.Adsgram && blockId) {
      AdControllerRef.current = window.Adsgram.init({ blockId });
    }
  }, [blockId]);

  useEffect(() => {
    initAd();
  }, [initAd]);

  return useCallback(async () => {
    if (!AdControllerRef.current) {
      initAd(); // Пробуем инициализировать, если реф пуст
    }

    if (AdControllerRef.current) {
      try {
        const result: ShowPromiseResult = await AdControllerRef.current.show();
        // Успех
        getApi();
        onReward?.();
      } catch (result: any) {
        // Если сессия истекла, Adsgram часто возвращает специфическую ошибку.
        // Переинициализируем контроллер для следующей попытки
        initAd();
        onError?.();
      }
    } else {
      onError?.();
    }
  }, [initAd, getApi, onReward, onError]);
}
