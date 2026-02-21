"use client";

import { AdController, ShowPromiseResult } from "@/adsgram";
import { useCallback, useRef } from "react";
import { useAdsMutation } from "./hooks/useAdsMutation";

/**
 * Проверьте раздел Typescript
 * и используйте свой путь к типам adsgram
 */

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

  return useCallback(async () => {
    if (!blockId || !window.Adsgram) {
      onError?.();
      return;
    }
    if (!AdControllerRef.current) {
      AdControllerRef.current = window.Adsgram?.init({
        blockId: blockId,
        // debug: true,
        // debugBannerType: "FullscreenMedia",
      });
    }
    AdControllerRef.current
      .show()
      .then((e) => {
        // Пользователь просмотрел рекламу до конца или пропустил в Interstitial формате
        getApi();
        onReward?.();
      })
      .catch((result: ShowPromiseResult) => {
        // Ошибка при воспроизведении рекламы
        AdControllerRef.current = undefined;
        console.log("AD ERROR:", result);
        onError?.();
      });
  }, [blockId, getApi, onError, onReward]);
}
