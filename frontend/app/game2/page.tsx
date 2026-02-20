"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SIZE = 6;
const MAX = 4;

export default function ChainReactionGame() {
  const createBoard = () =>
    Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => 0)
    );

  const [board, setBoard] = useState<number[][]>(createBoard);
  const [moves, setMoves] = useState(0);
  const [exploding, setExploding] = useState<string[]>([]);

  const explode = (grid: number[][], x: number, y: number) => {
    const newGrid = grid.map((row) => [...row]);
    newGrid[x][y] = 0;

    const key = `${x}-${y}`;
    setExploding((prev) => [...prev, key]);

    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    directions.forEach(([dx, dy]) => {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
        newGrid[nx][ny]++;
        if (newGrid[nx][ny] >= MAX) {
          return explode(newGrid, nx, ny);
        }
      }
    });

    return newGrid;
  };

  const handleClick = (x: number, y: number) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[x][y]++;

    let finalBoard = newBoard;

    if (newBoard[x][y] >= MAX) {
      finalBoard = explode(newBoard, x, y);
    }

    setBoard(finalBoard);
    setMoves((prev) => prev + 1);

    setTimeout(() => {
      setExploding([]);
    }, 400);
  };

  const reset = () => {
    setBoard(createBoard());
    setMoves(0);
  };

  const isWin =
    moves > 0 && board.flat().every((cell) => cell === 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-3xl font-bold tracking-wide">
        💥 Chain Reaction
      </h1>

      <div className="grid grid-cols-6 gap-3">
        {board.map((row, x) =>
          row.map((cell, y) => {
            const key = `${x}-${y}`;
            const isExploding = exploding.includes(key);

            return (
              <motion.button
                key={key}
                onClick={() => handleClick(x, y)}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center relative overflow-hidden"
              >
                <AnimatePresence>
                  {cell > 0 && (
                    <motion.span
                      key={cell}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-xl font-bold"
                    >
                      {cell}
                    </motion.span>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {isExploding && (
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute w-full h-full bg-orange-500 rounded-2xl"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })
        )}
      </div>

      <div className="text-lg">Ходы: {moves}</div>

      <AnimatePresence>
        {isWin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-500 text-xl font-bold"
          >
            Победа! 🎉
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        className="px-6 py-2 bg-blue-600 rounded-xl font-semibold"
      >
        Сброс
      </motion.button>
    </div>
  );
}
