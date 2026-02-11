'use client'
import { AdController, ShowPromiseResult } from '@/adsgram';
import { useCallback, useEffect, useRef } from 'react';
/**
 * Проверьте раздел Typescript
  * и используйте свой путь к типам adsgram
 */

export interface useAdsgramParams {
  blockId: string;
  onReward?: () => void;
  onError?: (result: ShowPromiseResult) => void;
}

export function useAdsgram({ blockId, onReward, onError }: useAdsgramParams): () => Promise<void> {
  const AdControllerRef = useRef<AdController | undefined>(undefined);

  useEffect(() => {
	console.log(blockId);
	console.log(typeof blockId);
	
    AdControllerRef.current = window.Adsgram?.init({ blockId, debug: true, debugBannerType: 'FullscreenMedia' }).show();
  }, [blockId]);

  return useCallback(async () => {
    if (AdControllerRef.current) {
      AdControllerRef.current
        .show()
        .then(() => {
          // Пользователь просмотрел рекламу до конца или пропустил в Interstitial формате
          onReward?.();
        })
        .catch((result: ShowPromiseResult) => {
          // Ошибка при воспроизведении рекламы
          onError?.(result);
        });
    } else {
      onError?.({
        error: true,
        done: false,
        state: 'load',
        description: 'Adsgram script not loaded',
      });
    }
  }, [onError, onReward]);
}