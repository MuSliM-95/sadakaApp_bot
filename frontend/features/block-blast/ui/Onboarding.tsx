"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  onboardingStep: number;
  showOnboarding: boolean;
  setOnboardingStep: React.Dispatch<React.SetStateAction<number>>;
  setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Onboarding: React.FC<Props> = ({
  className,
  onboardingStep,
  showOnboarding,
  setOnboardingStep,
  setShowOnboarding,
}) => {
  const { t } = useTranslation("block_blast");

  return (
    <>
      {showOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white text-slate-800 w-full max-w-sm rounded-[3rem] p-8 flex flex-col items-center text-center shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {onboardingStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-6">
                    <Trophy size={40} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight">
                    {t("onboarding.welcomeTitle")}
                  </h2>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    {t("onboarding.welcomeText")}
                  </p>
                </motion.div>
              )}

              {onboardingStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mb-6">
                    <Play size={40} fill="currentColor" className="rotate-90" />
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight">
                    {t("onboarding.dragTitle")}
                  </h2>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    {t("onboarding.dragText")}
                  </p>
                </motion.div>
              )}

              {onboardingStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mb-6">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="w-4 h-4 bg-green-500 rounded-sm" />
                      <div className="w-4 h-4 bg-green-500 rounded-sm" />
                      <div className="w-4 h-4 bg-green-500 rounded-sm" />
                      <div className="w-4 h-4 bg-green-500 rounded-sm" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight">
                    {t("onboarding.clearTitle")}
                  </h2>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    {t("onboarding.clearText")}
                  </p>
                </motion.div>
              )}

              {onboardingStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-3xl flex items-center justify-center mb-6">
                    <X size={40} strokeWidth={3} />
                  </div>
                  <h2 className="text-3xl font-black mb-4 tracking-tight">
                    {t("onboarding.strategyTitle")}
                  </h2>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    {t("onboarding.strategyText")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-4 w-full mt-10">
              {onboardingStep > 0 && (
                <button
                  onClick={() => setOnboardingStep((prev) => prev - 1)}
                  className="flex-1 py-5 bg-slate-100 text-slate-500 font-black rounded-3xl active:scale-95 transition-transform uppercase tracking-widest"
                >
                  {t("onboarding.back")}
                </button>
              )}

              <button
                onClick={() => {
                  if (onboardingStep < 3) {
                    setOnboardingStep((prev) => prev + 1);
                  } else {
                    setShowOnboarding(false);
                    localStorage.setItem("blockBlast_onboarded", "true");
                  }
                }}
                className="flex-[2] py-5 bg-[#3252a8] text-white font-black rounded-3xl shadow-lg active:scale-95 transition-transform uppercase tracking-widest"
              >
                {onboardingStep < 3
                  ? t("onboarding.next")
                  : t("onboarding.done")}
              </button>
            </div>

            <div className="flex gap-2 mt-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    onboardingStep === i ? "w-6 bg-[#3252a8]" : "bg-slate-200"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};