"use client"
import { Home, Volume2, VolumeX, X } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
  showSettings: boolean;
  soundEnabled: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Settings: React.FC<Props> = ({
  className,
  showSettings,
  soundEnabled,
  setShowSettings,
  setSoundEnabled,
  setIsMenu,
}) => {
  const { t } = useTranslation("block_blast");

  return (
    <>
      {showSettings && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-8 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  {t("settings.title")}
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-600 group-active:scale-90 transition-transform">
                      {soundEnabled ? (
                        <Volume2 size={24} />
                      ) : (
                        <VolumeX size={24} />
                      )}
                    </div>
                    <span className="font-bold text-slate-700">
                      {t("settings.sound")}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      soundEnabled ? "bg-green-500" : "bg-slate-300"
                    )}
                  >
                    <motion.div
                      animate={{ x: soundEnabled ? 24 : 4 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                    />
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowSettings(false);
                    setIsMenu(true);
                  }}
                  className="flex items-center gap-4 p-5 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all group"
                >
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-slate-600 group-active:scale-90 transition-transform">
                    <Home size={24} />
                  </div>
                  <span className="font-bold text-slate-700">
                    {t("settings.menu")}
                  </span>
                </button>
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full py-5 bg-[#3252a8] text-white font-black rounded-3xl shadow-lg active:scale-95 transition-transform uppercase tracking-widest mt-2"
              >
                {t("settings.continue")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};