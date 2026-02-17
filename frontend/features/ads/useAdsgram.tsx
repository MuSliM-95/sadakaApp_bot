"use client";

import { AdController, ShowPromiseResult } from "@/adsgram";
import { useCallback, useEffect, useRef } from "react";
import { useAdsMutation } from "./hooks/useAdsMutation";

/**
 * Проверьте раздел Typescript
 * и используйте свой путь к типам adsgram
 */

export interface useAdsgramParams {
  blockId: string;
  onReward?: () => void;
  onError?: () => void;
  secondsLeft?: number;
}

export function useAdsgram({
  blockId,
  secondsLeft = 0,
  onReward,
  onError,
}: useAdsgramParams): () => Promise<void> {
  const AdControllerRef = useRef<AdController | undefined>(undefined);

  const { getApi } = useAdsMutation();

  useEffect(() => {
    if (!blockId || !window.Adsgram || secondsLeft > 0) return;

    AdControllerRef.current = window.Adsgram?.init({
      blockId: blockId,
      // debug: true,
      // debugBannerType: "FullscreenMedia",
    });
  }, [blockId, secondsLeft]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then((e) => {
          // Пользователь просмотрел рекламу до конца или пропустил в Interstitial формате

          getApi();
          onReward?.();
        })
        .catch((result: ShowPromiseResult) => {
          // Ошибка при воспроизведении рекламы
          onError?.();
        });
    } else {
      onError?.();
    }
  }, [onError, onReward]);
}
