"use client";

import { Crown, RotateCcw, X } from "lucide-react";
import React, { useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { usePointsAllQuery } from "../hooks/usePointsAllQuery";

interface Props {
  className?: string;
  showLeaderboard: boolean;
  setShowLeaderboard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Leaderboard: React.FC<Props> = ({
  className,
  showLeaderboard,
  setShowLeaderboard,
}) => {
  const { t } = useTranslation("block_blast");
  const { data } = usePointsAllQuery();

  const leaderboard = useMemo(() => {
        if(!data) return []
        return [...data].sort((a, b) => b.score - a.score)
  }, [data])


  const resetLeaderboard = () => {
    // пока пусто, но UI уже готов
  };

  return (
    <>
      {showLeaderboard && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className={cn(
              "bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden flex flex-col max-h-[80vh] shadow-2xl",
              className
            )}
          >
            {/* HEADER */}
            <div className="p-6 flex justify-between items-center border-b border-slate-100">
              <div className="flex flex-col">
                <h2 className="text-1xl font-black flex items-center gap-2 text-slate-800">
                  <Crown className="text-amber-500" />
                  {t("leaderboard.title")}
                </h2>
                <span className="text-[8px] uppercase tracking-widest text-slate-400 font-black mt-0.5">
                  {t("leaderboard.subtitle")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetLeaderboard}
                  className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
                  title={t("leaderboard.reset")}
                >
                  <RotateCcw size={20} />
                </button>

                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all",
                      index === 0
                        ? "bg-amber-50 border-amber-200 shadow-sm"
                        : "bg-slate-50 border-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center font-black text-lg shadow-sm",
                          index === 0
                            ? "bg-amber-400 text-white"
                            : index === 1
                            ? "bg-slate-300 text-white"
                            : index === 2
                            ? "bg-orange-300 text-white"
                            : "bg-white text-slate-400"
                        )}
                      >
                        {index + 1}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 truncate max-w-[120px]">
                          {entry.user.username || t("leaderboard.player")}
                        </span>

                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                          {t("leaderboard.points")}:{" "}
                          {entry.score.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <span className="text-xl font-black text-slate-800">
                      {entry.score.toLocaleString()}
                    </span>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-30">
                  <Crown size={64} className="mb-4" />
                  <span className="font-black uppercase tracking-widest text-sm">
                    {t("leaderboard.noScores")}
                  </span>
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setShowLeaderboard(false)}
                className="w-full py-4 bg-[#3252a8] text-white font-black rounded-2xl shadow-lg active:scale-95 transition-transform uppercase tracking-widest"
              >
                {t("leaderboard.close")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};