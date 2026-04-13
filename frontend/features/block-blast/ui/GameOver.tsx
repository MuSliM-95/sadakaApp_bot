"use client"
import React from "react";
import { motion } from "motion/react";
import { Play, X } from "lucide-react";

interface Props {
  className?: string;
  gameOver: boolean;
  score: number 
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>
  setShowLeaderboard: React.Dispatch<React.SetStateAction<boolean>>
  restartGame: () => void
}

export const GameOver: React.FC<Props> = ({ className, gameOver, score, setGameOver, setShowLeaderboard, restartGame }) => {
  return (
    <>
      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white text-black w-full max-w-xs rounded-3xl p-8 flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mb-6">
              <X size={40} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-black mb-2">GAME OVER</h2>
            <p className="text-gray-500 mb-8 font-medium">
              You scored {score} points!
            </p>

            <button
              onClick={restartGame}
              className="w-full bg-blue-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
            >
              <Play size={20} fill="currentColor" />
              TRY AGAIN
            </button>

            <button
              onClick={() => {
                setGameOver(false);
                setShowLeaderboard(true);
              }}
              className="w-full mt-3 bg-gray-100 text-gray-600 font-bold py-4 rounded-2xl hover:bg-gray-200 active:scale-95 transition-all"
            >
              LEADERBOARD
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
