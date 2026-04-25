"use client";
import React from "react";
import { motion } from "motion/react";
import { Crown, Gamepad2, Play, ArrowBigLeftDash } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { AdsInfoBanner } from "@/shared/components/ui/ads.info.banner";
import { cn } from "@/lib/utils";
import { Platform } from "@/shared/types/global.types";
import { useAppSelector } from "@/store/hooks";

interface Props {
  className?: string;
  restartGame: () => void;
  setIsMenu: (value: React.SetStateAction<boolean>) => void;
  setShowLeaderboard: React.Dispatch<React.SetStateAction<boolean>>;
  setOnboardingStep: (value: React.SetStateAction<number>) => void;
  setShowOnboarding: (value: React.SetStateAction<boolean>) => void;
  isPreparing: boolean;
  countdown: number;
}

export const RenderMenu: React.FC<Props> = ({
  className,
  setIsMenu,
  restartGame,
  setShowLeaderboard,
  setOnboardingStep,
  setShowOnboarding,
  isPreparing,
  countdown,
}) => {
  const { t } = useTranslation("block_blast");
  const platform = useAppSelector((state) => state.ad.platform);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-md mx-auto select-none overflow-hidden bg-[#3252a8] items-center justify-center p-8">
      <button
        onClick={() => {
          setOnboardingStep(0);
          setShowOnboarding(true);
        }}
        className={cn(
          "fixed  right-2 cursor-pointer text-white",
          Platform.TDESKTOP !== platform ? "top-[92px]" : "top-2"
        )}
      >
        {/* Gamepad2 icon - moved slightly right and made more prominent with thicker stroke as requested */}
        <Gamepad2
          size={32}
          strokeWidth={3}
          className="translate-y-[-1px] ml-2 shrink-0"
        />
      </button>
      <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-12"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative grid grid-cols-3 gap-2 p-4 bg-white/10 rounded-3xl border border-white/20 backdrop-blur-sm">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-yellow-400 rounded-lg shadow-[inset_2px_2px_2px_rgba(255,255,255,0.4),inset_-2px_-2px_2px_rgba(0,0,0,0.4)]"
                />
              ))}
            </div>
          </div>
          <h1 className="text-4xl uppercase font-black text-white tracking-tighter text-center leading-none">
            {t("game-name")}
          </h1>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => {
              setIsMenu(false);
              restartGame();
            }}
            className="w-full py-4 bg-white cursor-pointer text-[#3252a8] font-black rounded-[2rem] shadow-[0_8px_0_#cbd5e1] active:translate-y-1 active:shadow-[0_4px_0_#cbd5e1] transition-all text-2xl uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <Play fill="currentColor" size={28} />
            {t("play")}
          </button>

          <button
            onClick={() => setShowLeaderboard(true)}
            className="w-full py-4 bg-amber-400 cursor-pointer text-white font-black rounded-[2rem] shadow-[0_8px_0_#d97706] active:translate-y-1 active:shadow-[0_4px_0_#d97706] transition-all text-xl uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <Crown fill="currentColor" size={24} />
            {t("rating")}
          </button>

          <Link
            href="/"
            className="w-full py-4 bg-slate-900 cursor-pointer text-white font-black rounded-[2rem] shadow-[0_8px_0_#334155] active:translate-y-1 active:shadow-[0_4px_0_#334155] transition-all text-xl uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <ArrowBigLeftDash
              size={32}
              strokeWidth={3}
              className="translate-y-[1px] ml-2 shrink-0"
            />
            <span>{t("back")}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
