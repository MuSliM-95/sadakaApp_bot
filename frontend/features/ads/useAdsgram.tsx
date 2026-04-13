import { AdController, ShowPromiseResult } from "@/adsgram";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTicketsQuery } from "../tickets/hooks/useTicketsQuery";
import { useAdsTicketQuery } from "./hooks/useAdsTicketQuery";
import { useAppDispatch } from "@/store/hooks";
import { adsTicketsUpdate } from "@/store/ad.slice";

export interface useAdsgramParams {
  blockId: string;
  onReward?: () => void;
  onError?: () => void;
}

export function useAdsgram({
  blockId,
  onReward,
  onError,
}: useAdsgramParams) {
  const AdControllerRef = useRef<AdController | undefined>(undefined);
  const dispatch = useAppDispatch();
  const { data: tickets } = useTicketsQuery();
  const { data: ads } = useAdsTicketQuery();

  const [isPreparing, setIsPreparing] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (ads != null && tickets != null) {
      dispatch(adsTicketsUpdate({ ads: ads, tickets: tickets }));
    }
  }, [ads, tickets]);

  useEffect(() => {
    AdControllerRef.current = window.Adsgram?.init({
      blockId,
      // debug: true,
      // debugBannerType: "FullscreenMedia",
    });
  }, [blockId]);

  const startCountdown = () => {
    setIsPreparing(true);
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          showInternal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const showInternal = () => {
    if (!AdControllerRef.current) {
      setIsPreparing(false);
      onError?.();
      return;
    }

    AdControllerRef.current
      .show()
      .then(() => {
        setIsPreparing(false);
        onReward?.();
      })
      .catch((result: ShowPromiseResult) => {
        setIsPreparing(false);
        onError?.();
      });
  };

  const showAd = useCallback(async () => {
    startCountdown();
  }, []);

  return {
    showAd,
    isPreparing,
    countdown,
  };
}