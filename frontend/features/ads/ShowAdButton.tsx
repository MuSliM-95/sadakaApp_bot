"use client";

import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef
} from "react";
import { Youtube, TicketCheck } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startCooldown, tick } from "@/store/ad.slice";
import { useAdsgram } from "./useAdsgram";
import { AdsInfoBanner } from "@/shared/components/ui/ads.info.banner";
import { useAdsMutation } from "./hooks/useAdsMutation";
import { Advertising } from "@/shared/types/global.types";
import { useTokenQuery } from "./hooks/useTokenQuery";
import { IGenerateToken } from "./types/ads.types";

interface IProps {
  className?: string;
  children?: ReactNode;
}

export function ShowAdButton({ className, children }: IProps): ReactElement {
  const { refetch } = useTokenQuery();
  const { addReward } = useAdsMutation();

  const tokenRef = useRef<IGenerateToken | null>(null);

  const cooldown = useAppSelector((state) => state.ad.cooldown);
  const secondsLeft = useAppSelector((state) => state.ad.secondsLeft);
  const ads = useAppSelector((state) => state.ad.ads);
  const dispatch = useAppDispatch();

  const onReward = useCallback(() => {
    const date = Date.now() + 60 * 100;
    dispatch(startCooldown({ timer: date, type: "init" }));
    if (tokenRef.current) {
      addReward({ type: Advertising.REWARD, data: tokenRef.current });
    }
  }, [dispatch, addReward]);

  const onError = useCallback(() => {
    // setAds(false);
  }, []);

  const { showAd, isPreparing, countdown } = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID!,
    onReward,
    onError,
  });

  const triggerAd = useCallback(async () => {
    if (!showAd || secondsLeft > 0) return;
    const { data } = await refetch();
    tokenRef.current = data ?? null;
    showAd();
  }, [showAd, secondsLeft, refetch]);

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
      <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} />
      <TooltipTrigger asChild>
        <button
          disabled={secondsLeft > 0}
          onClick={triggerAd}
          className={cn(
            "group relative overflow-hidden h-14 w-full rounded-2xl px-6",
            "flex items-center justify-center gap-3",
            "font-semibold tracking-wide",
            "transition-all duration-500 ease-out",
            "backdrop-blur-xl cursor-pointer",
            secondsLeft > 0
              ? "bg-zinc-900/80 border border-zinc-800 text-white/50 cursor-not-allowed"
              : [
                  "bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-700",
                  "text-white",
                  "shadow-[0_10px_40px_-10px_rgba(139,92,246,0.6)]",
                  "hover:shadow-[0_15px_50px_-10px_rgba(139,92,246,0.8)]",
                  "hover:-translate-y-1 active:scale-95",
                ]
          )}
        >
          {/* Glow слой */}
          {secondsLeft === 0 && (
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}

          {/* Shine sweep */}
          {secondsLeft === 0 && (
            <span className="absolute -left-1/2 top-0 h-full w-1/2 bg-white/20 blur-2xl rotate-12 translate-x-0 group-hover:translate-x-[250%] transition-transform duration-1000 ease-out" />
          )}

          {secondsLeft > 0 ? (
            <span className="text-sm font-bold tracking-widest">
              {secondsLeft}
            </span>
          ) : (
            <>
              <span>5/{ads}</span>
              <TicketCheck size={20} className="opacity-90 mt-1" />
              <span className="relative z-10">{children}</span>
            </>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Реклама</p>
      </TooltipContent>
    </Tooltip>
  );
}
