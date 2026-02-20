"use client";

import { ReactElement, ReactNode, useCallback, useEffect } from "react";
import { Youtube } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startCooldown, tick } from "@/store/ad.slice";
import { useAdsgram } from "./useAdsgram";

interface IProps {
  className?: string;
  children?: ReactNode;
}

export function ShowAdButton({ className, children }: IProps): ReactElement {
  const cooldown = useAppSelector((state) => state.ad.cooldown);
  const secondsLeft = useAppSelector((state) => state.ad.secondsLeft);
  const dispatch = useAppDispatch();

  const onReward = useCallback(() => {
    // setAds(false);
    const date = Date.now() + 120 * 1000;
    dispatch(startCooldown(date));
  }, [dispatch]);

  const onError = useCallback(() => {
    // setAds(false);
  }, []);
  const showAd = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID_INIT!,
    onReward,
    onError,
  });

  const triggerAd = useCallback(() => {
    if (!showAd || secondsLeft > 0) return;

    showAd();
  }, [showAd, secondsLeft]);

  /**
   * Вставьте ваш blockId
   *
   */
  useEffect(() => {
    if (!cooldown) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown, dispatch]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          disabled={secondsLeft > 0}
          onClick={triggerAd}
          className={cn(
            "relative w-14 h-14 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300",
            "backdrop-blur-xl border",
            secondsLeft > 0
              ? "bg-zinc-900 border-zinc-700 text-white/70 cursor-not-allowed"
              : "bg-gradient-to-br from-red-500 to-red-600 border-red-400 shadow-lg shadow-red-500/30 hover:scale-110 active:scale-95"
          )}
        >
          {secondsLeft > 0 ? (
            <span className="text-sm font-bold">{secondsLeft}</span>
          ) : (
            <Youtube size={20} className="drop-shadow-lg" />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Реклама</p>
      </TooltipContent>
    </Tooltip>
  );
}
