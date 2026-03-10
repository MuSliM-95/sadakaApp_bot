"use client";

import { useAdsgram } from "@/features/ads/useAdsgram";
import { BackButton } from "@/features/ui/BackButton";
import {
  gameAdaTimerTick,
  startCooldown,
} from "@/store/ad.slice";
import { saveGame } from "@/store/game.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState, useCallback } from "react";

type Difficulty = {
  size: number;
  label: string;
  color: string;
};

const LEVELS: Difficulty[] = [
  {
    size: 3,
    label: "Новичок",
    color: "from-green-400 to-emerald-600",
  },
  {
    size: 4,
    label: "Мастер",
    color: "from-blue-500 to-indigo-600",
  },
  {
    size: 5,
    label: "Легенда",
    color: "from-purple-500 to-rose-600",
  },
];

const STORAGE_KEY = "mosaic-pro-save";

export function MosaicGame() {
  const cooldownGame = useAppSelector((state) => state.ad.cooldownGame);
  const secondsLeft = useAppSelector((state) => state.ad.secondsLeft);

  const dispatch = useAppDispatch();

  const [levelIdx, setLevelIdx] = useState(0);
  const [tiles, setTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAdActive, setIsAdActive] = useState(false);

  // 🔥 Таймер
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const onReward = useCallback(() => {
    const date = Date.now() + 3 * 60 * 60 * 1000;
    dispatch(startCooldown({ timer: date, type: "game" }));
    setIsAdActive(false);
  }, [dispatch]);

  const onError = useCallback(() => {
    setIsAdActive(false);
  }, []);

  const { showAd } = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID_INIT!,
    onReward,
    onError,
  });

  useEffect(() => {
    if (!isSolved && isInitialized && !isAdActive) {
      setIsTimerRunning(true);
    }
  }, [isSolved, isInitialized, isAdActive]);

  const triggerAd = useCallback(() => {
    if (!showAd || secondsLeft > 0) return;

    setIsTimerRunning(false); // 🔥 обязательно
    setIsAdActive(true);

    showAd();
  }, [showAd, secondsLeft]);

  useEffect(() => {
    if (!cooldownGame) return;

    const interval = setInterval(() => {
      dispatch(gameAdaTimerTick());
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownGame, dispatch]);

  // ⏱ Таймер эффект
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    dispatch(saveGame({id: 0, name: "MOSAIC.PRO", href: "games/puzzle", url: null }));
  }, []);

  // Инициализация игры
  const initGame = useCallback((idx: number, forceNew = false) => {
    const size = LEVELS[idx].size;

    // Попытка восстановить сохранение
    if (!forceNew) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.levelIdx === idx && data.tiles.length === size * size) {
          setTiles(data.tiles);
          setMoves(data.moves);
          setIsSolved(data.isSolved);
          setTime(data.time || 0);
          setLevelIdx(idx);
          setIsInitialized(true);
          return;
        }
      }
    }

    // Создаём "правильный" порядок
    let newTiles = [...Array(size * size).keys()].map(
      (i) => (i + 1) % (size * size)
    );
    let emptyIndex = newTiles.indexOf(0);

    // Количество случайных ходов зависит от размера
    const shuffleMoves = size * size * 10;

    for (let i = 0; i < shuffleMoves; i++) {
      const row = Math.floor(emptyIndex / size);
      const col = emptyIndex % size;

      const neighbors = [];
      if (row > 0) neighbors.push(emptyIndex - size);
      if (row < size - 1) neighbors.push(emptyIndex + size);
      if (col > 0) neighbors.push(emptyIndex - 1);
      if (col < size - 1) neighbors.push(emptyIndex + 1);

      const nextIndex = neighbors[Math.floor(Math.random() * neighbors.length)];

      [newTiles[emptyIndex], newTiles[nextIndex]] = [
        newTiles[nextIndex],
        newTiles[emptyIndex],
      ];

      emptyIndex = nextIndex;
    }

    // Проверяем, не получился ли случайно уже решённый пазл
    const isSolvedPuzzle = (tiles: number[]) => {
      for (let i = 0; i < tiles.length - 1; i++) {
        if (tiles[i] !== i + 1) return false;
      }
      return tiles[tiles.length - 1] === 0;
    };

    if (isSolvedPuzzle(newTiles)) {
      // Если случайно решено — перемешиваем заново
      return initGame(idx, true);
    }

    setTiles(newTiles);
    setMoves(0);
    setTime(0);
    setIsSolved(false);
    setLevelIdx(idx);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      initGame(data.levelIdx);
    } else {
      initGame(0);
    }
  }, [initGame]);

  useEffect(() => {
    if (isInitialized) {
      const saveData = { levelIdx, tiles, moves, isSolved, time };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    }
  }, [tiles, moves, isSolved, levelIdx, isInitialized, time]);

  const moveTile = (index: number) => {
    if (isSolved) return;
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const size = LEVELS[levelIdx].size;
    const emptyIndex = tiles.indexOf(0);

    const row = Math.floor(index / size);
    const col = index % size;
    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    if (Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];

      setTiles(newTiles);
      setMoves((m) => m + 1);

      const won = newTiles.every((tile, i) => tile === (i + 1) % (size * size));

      if (won) {
        setIsTimerRunning(false);
        setIsSolved(true);
        triggerAd();
      }
    }
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    initGame(levelIdx, true);
  };

  if (!isInitialized) return <div className="bg-[#0a0a0c] min-h-screen" />;

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-4 font-sans text-slate-100">
      <BackButton />

      <div className="text-center mb-8">
        <h1 className="text-5xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
          MOSAIC<span className="text-blue-500">.</span>PRO
        </h1>

        <div className="flex gap-2 justify-center">
          {LEVELS.map((l, i) => (
            <button
              key={l.label}
              onClick={() => initGame(i, true)}
              className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                levelIdx === i
                  ? `bg-white text-black scale-110`
                  : "bg-white/10 text-white/50 hover:bg-white/20"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Статистика */}
      <div className="flex gap-8 mb-6 text-sm font-mono uppercase tracking-widest text-white/60 bg-white/5 px-6 py-2 rounded-full border border-white/5">
        <div className="flex flex-col items-center">
          <span className="text-[10px]">Ходы</span>
          <span className="text-white text-xl font-bold">{moves}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px]">Время</span>
          <span className="text-white text-xl font-bold">
            {formatTime(time)}
          </span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px]">Сетка</span>
          <span className="text-white text-xl font-bold">
            {LEVELS[levelIdx].size}x{LEVELS[levelIdx].size}
          </span>
        </div>
      </div>

      <div
        className="grid gap-2 p-3 bg-white/5 rounded-2xl border border-white/10"
        style={{
          gridTemplateColumns: `repeat(${LEVELS[levelIdx].size}, minmax(0, 1fr))`,
        }}
      >
        {tiles.map((tile, index) => (
          <div
            key={`${levelIdx}-${index}`}
            onClick={() => moveTile(index)}
            style={{
              width: LEVELS[levelIdx].size === 5 ? "60px" : "80px",
              height: LEVELS[levelIdx].size === 5 ? "60px" : "80px",
            }}
            className={`flex items-center justify-center text-2xl font-black rounded-xl cursor-pointer select-none transition-all duration-200 active:scale-90 ${
              tile === 0
                ? "bg-transparent border-2 border-dashed border-white/5"
                : `bg-gradient-to-br ${LEVELS[levelIdx].color}`
            }`}
          >
            {tile !== 0 && tile}
          </div>
        ))}
      </div>

      {isSolved && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg animate-fade-in">
          <div className="relative text-center p-8 md:p-12 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 rounded-3xl shadow-2xl shadow-black/50 transform scale-95 animate-scale-in">
            {/* Трофей */}
            <div className="text-6xl md:text-7xl mb-4 animate-bounce">🏆</div>

            {/* Заголовок */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 italic tracking-tight text-white drop-shadow-lg">
              ВЕЛИКОЛЕПНО!
            </h2>

            <h3
              className={`text-2xl bg-gradient-to-r ${LEVELS[levelIdx].color} bg-clip-text text-transparent`}
            >
              {LEVELS[levelIdx].label}
            </h3>

            {/* Подзаголовок с ходами и временем */}
            <p className="text-white/90 mb-8 font-medium text-sm md:text-base">
              Ты собрал это за <span className="font-bold">{moves} ходов</span>{" "}
              и <span className="font-bold">{formatTime(time)}</span>
            </p>

            <button
              onClick={() => initGame(levelIdx, true)}
              className="relative w-full py-4 mb-2 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 active:scale-95 transition-all shadow-lg shadow-black/40"
            >
              ЕЩЁ РАЗ
              {/* Glow эффект при hover */}
              <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 hover:opacity-40 transition-opacity pointer-events-none" />
            </button>
            {levelIdx < LEVELS.length - 1 && (
              <button
                onClick={() => initGame(levelIdx + 1, true)}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all hover:scale-[1.02]"
              >
                ДАЛЕЕ →
              </button>
            )}

            {/* Конфетти/звёздочки (мини-анимация) */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="animate-ping-slow absolute top-2 left-1 w-2 h-2 bg-white rounded-full" />
              <div className="animate-ping-slow absolute top-4 right-4 w-2 h-2 bg-white rounded-full" />
              <div className="animate-ping-slow absolute bottom-2 left-8 w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={resetProgress}
        className="mt-10 px-6 py-2 border border-white/10 rounded-full text-white/30 hover:text-white hover:bg-white/5 text-[10px] font-bold uppercase tracking-[0.2em]"
      >
        Сбросить прогресс
      </button>
    </div>
  );
}
