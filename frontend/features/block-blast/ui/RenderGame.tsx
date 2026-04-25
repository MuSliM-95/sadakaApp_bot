"use client";

import { Crown, Play, RefreshCw, RotateCcw, Settings, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import React, { useCallback, useEffect, useState } from "react";
import {
  AvailableShapes,
  CanPlaceShape,
  FloatingScores,
  GhostPosition,
  Haptic,
  Shape,
} from "../types/points.types";
import { cn } from "@/lib/utils";
import { usePointsQuery } from "../hooks/usePointsQuery";
import { useAdsgram } from "@/features/ads/useAdsgram";
import { Platform } from "@/shared/types/global.types";
import { useAppSelector } from "@/store/hooks";
import { AdsInfoBanner } from "@/shared/components/ui/ads.info.banner";
import { toast } from "sonner";

interface Props {
  className?: string;
  restartGame: () => void;
  score: number;
  level: number;
  highScore: number;
  gameOver: boolean;
  setDraggedShape: React.Dispatch<React.SetStateAction<Shape | null>>;
  gridRef: React.RefObject<HTMLDivElement | null>;
  dragContainerRef: React.RefObject<HTMLDivElement | null>;
  GRID_SIZE: number;
  haptic: Haptic;
  playSound: (type: "place" | "clear" | "select", enabled: boolean) => void;
  soundEnabled: boolean;
  refreshCount: number;
  setAvailableShapes: (value: React.SetStateAction<Shape[]>) => void;
  getRandomShapes: (count: number, level: number, rng: () => number) => Shape[]
  setRefreshCount: (value: React.SetStateAction<number>) => void;
  setShowSettings: (value: React.SetStateAction<boolean>) => void;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  points: number;
  xp: number;
  xpToNextLevel: number;
  floatingScores: FloatingScores;
  isShaking: boolean;
  grid: string[][];
  draggedShape: Shape | null;
  ghostPosition: GhostPosition;
  canPlaceShape: CanPlaceShape;
  combo: number;
  availableShapes: AvailableShapes;
  rng: () => number;
}

export const RenderGame: React.FC<Props> = ({
  className,
  restartGame,
  score,
  level,
  highScore,
  gameOver,
  setDraggedShape,
  setPoints,
  points,
  gridRef,
  dragContainerRef,
  GRID_SIZE,
  haptic,
  playSound,
  soundEnabled,
  refreshCount,
  setAvailableShapes,
  getRandomShapes,
  setRefreshCount,
  setShowSettings,
  xp,
  xpToNextLevel,
  floatingScores,
  isShaking,
  grid,
  draggedShape,
  ghostPosition,
  canPlaceShape,
  combo,
  availableShapes,
  rng
}) => {
  const [cellSize, setCellSize] = useState(45);

  const platform = useAppSelector((state) => state.ad.platform);



  const onReward = useCallback(() => {
    setRefreshCount((prev) => prev - 1);
    setAvailableShapes(getRandomShapes(3, level, rng));
  }, [level]);
  
  const onError = useCallback(() => {}, [platform, level]);

  const { showAd, isPreparing, countdown } = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID!,
    onReward,
    onError,
  });
  /**
   * Triggered when user starts dragging a shape from the tray.
  */
 const handleDragStart = (
   shape: Shape,
   e: React.TouchEvent | React.MouseEvent
   ) => {
    if (gameOver) return;

    setDraggedShape(shape);
    const pos = "touches" in e ? e.touches[0] : e;
    
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      // Calculate cell size dynamically based on grid width to ensure perfect alignment
      const calculatedCellSize = (rect.width - 38) / GRID_SIZE;
      setCellSize(calculatedCellSize);
    }

    // Position the drag container immediately
    requestAnimationFrame(() => {
      if (dragContainerRef.current) {
        dragContainerRef.current.style.transform = `translate3d(${pos.clientX}px, ${pos.clientY}px, 0) translate(-50%, -50%)`;
      }
    });

    haptic.selection();
    playSound("select", soundEnabled);
  };

  /**
   * Refreshes the available shapes in the tray (limited uses).
   */
  const refreshShapes = () => {
    if (refreshCount > 0 && !gameOver) {
      showAd();
      if (Platform.TDESKTOP === platform) {
        setRefreshCount((prev) => prev - 1);
        setAvailableShapes(getRandomShapes(3, level, rng));
      }
      haptic.impact("medium");
    }
  };


  return (
    <div className="flex bg-black flex-col justify-center min-h-screen w-full max-w-md mx-auto select-none overflow-hidden">
      <AdsInfoBanner isPreparing={isPreparing} countdown={countdown} />
      <div className="">
        {/* Header Section: Displays current score, high score, and level progress */}
        <div className="px-6 flex flex-col items-center mt-2 z-10">
          <div className="flex justify-between w-full items-start">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 bg-white/10 cursor-pointer rounded-full text-white/80 hover:bg-white/20 transition-colors"
                title="Open Settings"
              >
                <Settings size={24} />
              </button>
              <button
                onClick={restartGame}
                className="p-2 bg-white/10 cursor-pointer rounded-full text-white/80 hover:bg-white/20 transition-colors"
                title="Restart Game"
              >
                <RotateCcw size={24} />
              </button>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-white">{score}</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#ffcc33]">
                <Crown size={20} fill="currentColor" />
              </div>
              <span className="text-1xl font-black text-[#ffcc33]">
                {points}
              </span>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="w-full mt-2 flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black whitespace-nowrap">
              Level {level}
            </span>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-white/80"
                initial={{ width: 0 }}
                animate={{ width: `${(xp / xpToNextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Grid Container: The main game board */}
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div
            ref={gridRef}
            animate={
              isShaking
                ? {
                    x: [0, -10, 10, -10, 10, 0],
                    y: [0, 5, -5, 5, -5, 0],
                  }
                : {}
            }
            transition={{ duration: 0.3 }}
            className="relative grid grid-cols-8 gap-[2px] p-2 bg-[#0a122a] rounded-xl aspect-square w-full max-w-[400px] border-[4px] border-[#0a122a]"
            style={{ gridTemplateRows: "repeat(8, 1fr)" }}
          >
            {/* Floating Scores */}
            <AnimatePresence>
              {floatingScores.map((fs) => (
                <motion.div
                  key={fs.id}
                  initial={{ opacity: 0, scale: 0.5, y: 0 }}
                  animate={{ opacity: 1, scale: 1.2, y: -100 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute pointer-events-none z-50 font-black text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                  style={{
                    left: fs.x,
                    top: fs.y,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  +{fs.score}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Render the 8x8 grid cells */}
            {grid.map((row, r) => (
              <React.Fragment key={`grid-row-${r}`}>
                {row.map((cell, c) => (
                  <div
                    key={`grid-cell-${r}-${c}`}
                    className={cn(
                      "rounded-[4px] relative overflow-hidden border border-black/10 transition-all duration-200",
                      // 3D effect: shadow for filled blocks, inset shadow for empty cells
                      cell
                        ? cn(cell, "shadow-[0_4px_0_rgba(0,0,0,0.3)]")
                        : "bg-[#1a2b4b] shadow-[inset_0_3px_6px_rgba(0,0,0,0.5)]"
                    )}
                  >
                    {/* Beveling effect for filled blocks */}
                    {cell && (
                      <>
                        <div className="absolute inset-0 border-[4px] border-t-white/40 border-l-white/20 border-r-black/20 border-b-black/40 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                      </>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}

            {/* Ghost Preview - Snapping instantly, no transitions */}
            {draggedShape && ghostPosition && (
              <div
                className="absolute inset-0 pointer-events-none grid grid-cols-8 gap-[2px] p-2"
                style={{ gridTemplateRows: "repeat(8, 1fr)" }}
              >
                {draggedShape.matrix.map((row, r) => (
                  <React.Fragment key={`ghost-row-${r}`}>
                    {row.map((val, c) => {
                      if (val === 0) return null;
                      const gridR = ghostPosition.r + r;
                      const gridC = ghostPosition.c + c;
                      if (
                        gridR < 0 ||
                        gridR >= GRID_SIZE ||
                        gridC < 0 ||
                        gridC >= GRID_SIZE
                      )
                        return null;

                      const isValid = canPlaceShape(
                        draggedShape,
                        ghostPosition.r,
                        ghostPosition.c,
                        grid
                      );

                      return (
                        <div
                          key={`ghost-${r}-${c}`}
                          className={cn(
                            "rounded-[4px] border border-white/10",
                            isValid
                              ? "bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                              : "bg-red-500/10"
                          )}
                          style={{
                            gridRowStart: gridR + 1,
                            gridColumnStart: gridC + 1,
                          }}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Combo Display */}
        <AnimatePresence mode="wait">
          {combo > 1 && (
            <motion.div
              key={`combo-${combo}`}
              initial={{ opacity: 0, scale: 0.5, rotate: -10, y: 20 }}
              animate={{
                opacity: 1,
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
                y: 0,
              }}
              exit={{ opacity: 0, scale: 1.5, y: -50 }}
              transition={{
                default: { type: "spring", stiffness: 400, damping: 15 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.3 },
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50 flex flex-col items-center"
            >
              <motion.span
                animate={{
                  color:
                    combo > 5
                      ? ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"]
                      : "#3b82f6",
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                  "font-black italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-center",
                  combo > 8 ? "text-6xl" : combo > 5 ? "text-5xl" : "text-4xl"
                )}
              >
                {combo > 8
                  ? "UNBELIEVABLE!"
                  : combo > 6
                  ? "PERFECT!"
                  : combo > 4
                  ? "AMAZING!"
                  : combo > 2
                  ? "GREAT!"
                  : "GOOD!"}
              </motion.span>
              <motion.span
                className={cn(
                  "font-black italic text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]",
                  combo > 8 ? "text-5xl" : combo > 5 ? "text-4xl" : "text-3xl"
                )}
              >
                COMBO x{combo}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shapes Tray */}
        <div className="relative h-30 p-4 flex justify-around items-center gap-4">
          {/* Refresh Button */}
          {availableShapes.length > 0 && !gameOver && (
            <button
              onClick={refreshShapes}
              disabled={refreshCount <= 0}
              className={cn(
                "absolute -top-6 right-4 w-8 h-8 cursor-pointer rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 z-20",
                refreshCount > 0
                  ? "bg-white text-[#3252a8] border-2 border-[#3252a8]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              <div className="relative flex items-center justify-center">
                <RefreshCw size={24} />
                <Play size={10} className="absolute fill-current ml-[1px]" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {refreshCount}
                </span>
              </div>
            </button>
          )}

          {availableShapes.map((shape) => (
            <div
              key={shape.id}
              className="relative flex items-center justify-center w-28 h-28"
              onTouchStart={(e) => handleDragStart(shape, e)}
              onMouseDown={(e) => handleDragStart(shape, e)}
            >
              <div
                className={cn(
                  "grid gap-[1px]",
                  draggedShape?.id === shape.id ? "opacity-0" : "opacity-100"
                )}
                style={{
                  gridTemplateColumns: `repeat(${shape.matrix[0].length}, 1fr)`,
                  gridTemplateRows: `repeat(${shape.matrix.length}, 1fr)`,
                }}
              >
                {shape.matrix.map((row, r) => (
                  <React.Fragment key={`shape-${shape.id}-row-${r}`}>
                    {row.map((val, c) => (
                      <div
                        key={`shape-cell-${shape.id}-${r}-${c}`}
                        className={cn(
                          "w-7 h-7 rounded-[3px] relative overflow-hidden",
                          val === 1
                            ? cn(
                                shape.color,
                                "border border-black/10 shadow-[0_2px_0_rgba(0,0,0,0.3)]"
                              )
                            : "bg-transparent"
                        )}
                      >
                        {val === 1 && (
                          <>
                            <div className="absolute inset-0 border-[3px] border-t-white/40 border-l-white/20 border-r-black/20 border-b-black/40 pointer-events-none" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                          </>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Floating Dragged Shape: The shape currently being moved by the user */}
        {draggedShape && (
          <div
            ref={dragContainerRef}
            className="fixed pointer-events-none z-50 transition-none"
            style={{
              left: 0,
              top: 0,
              willChange: "transform",
              filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.4))",
            }}
          >
            <div
              className="grid gap-[2px] transition-none"
              style={{
                gridTemplateColumns: `repeat(${draggedShape.matrix[0].length}, 1fr)`,
                gridTemplateRows: `repeat(${draggedShape.matrix.length}, 1fr)`,
              }}
            >
              {draggedShape.matrix.map((row, r) => (
                <React.Fragment key={`drag-row-${draggedShape.id}-${r}`}>
                  {row.map((val, c) => (
                    <div
                      key={`drag-cell-${draggedShape.id}-${r}-${c}`}
                      className={cn(
                        "rounded-[4px] relative overflow-hidden transition-none",
                        val === 1
                          ? cn(
                              draggedShape.color,
                              "border border-black/20 shadow-[0_6px_0_rgba(0,0,0,0.4),0_12px_20px_rgba(0,0,0,0.3)]"
                            )
                          : "bg-transparent"
                      )}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                    >
                      {val === 1 && (
                        <>
                          <div className="absolute inset-0 border-[6px] border-t-white/40 border-l-white/20 border-r-black/20 border-b-black/40 pointer-events-none transition-none" />
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none transition-none" />
                        </>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
