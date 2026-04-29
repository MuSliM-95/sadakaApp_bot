"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { Leaderboard } from "@/features/block-blast/ui/Leaderboard";
import { GameOver } from "@/features/block-blast/ui/GameOver";
import { RenderMenu } from "@/features/block-blast/ui/RenderMenu";
import { Move, Shape } from "@/features/block-blast/types/points.types";
import { RenderGame } from "@/features/block-blast/ui/RenderGame";
import { Settings } from "@/features/block-blast/ui/Settings";
import { Onboarding } from "@/features/block-blast/ui/Onboarding";
import { Toast } from "@/features/block-blast/ui/Toast";
import { usePointsMutation } from "../hooks/usePointsMutation";
import { SHAPES } from "../utils/gameEngine";
import { useGameSessionMutation } from "../hooks/useGameSessionMutation";
import { useAdsgram } from "@/features/ads/useAdsgram";
import { useAppDispatch } from "@/store/hooks";
import { startCooldown } from "@/store/ad.slice";
import { usePointsQuery } from "../hooks/usePointsQuery";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";

const tg = (window as any).Telegram?.WebApp;

const haptic = {
  impact: (
    style: "light" | "medium" | "heavy" | "rigid" | "soft" = "medium"
  ) => {
    tg?.HapticFeedback?.impactOccurred(style);
  },
  notification: (type: "error" | "success" | "warning") => {
    tg?.HapticFeedback?.notificationOccurred(type);
  },
  selection: () => {
    tg?.HapticFeedback?.selectionChanged();
  },
};

// --- GAME CONSTANTS ---
/**
 * Simple Audio Service using Web Audio API to synthesize game sounds.
 * This avoids the need for external assets and reduces load time.
 * We use oscillators to create 'retro' game sounds.
 */
let audioCtx: AudioContext | null = null;

/**
 * Plays a synthesized sound effect.
 * @param type - The type of sound to play ('place', 'clear', 'select').
 * @param enabled - Whether sound is currently enabled in settings.
 */
const playSound = (type: "place" | "clear" | "select", enabled: boolean) => {
  if (!enabled) return;

  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    // Resume context if it was suspended by the browser (common in modern browsers)
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    // Different sound profiles for different game actions
    if (type === "select") {
      // Short high-pitched blip for selection
      osc.type = "sine";
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "place") {
      // Lower frequency 'thud' for placing a block
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else {
      // Rising pitch for clearing lines
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    console.warn("Audio context failed", e);
  }
};

const GRID_SIZE = 8;
const XP_PER_BLOCK = 10;
const XP_PER_LINE = 100;
const COMBO_MULTIPLIER = 1.5;

// --- SHAPE GENERATION LOGIC ---
/**
 * A "Bag" system for shape generation.
 * This ensures that every shape from the SHAPES array is used exactly once
 * before any shape is repeated, providing maximum variety and preventing
 * the "same shapes repeating" issue.
 */
let shapeBag: Shape[] = [];

function createSeededRandom(seed: number) {
  let s = seed;

  return function () {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

/**
 * Refills and shuffles the shape bag.
 */
const refillBag = (rng: () => number) => {
  // Create a copy of all shapes and shuffle them using Fisher-Yates algorithm
  const newBag = [...SHAPES];
  for (let i = newBag.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [newBag[i], newBag[j]] = [newBag[j], newBag[i]];
  }
  shapeBag = newBag;
};

/**
 * Gets a set of random shapes using the bag system.
 * @param count - Number of shapes to generate (usually 3).
 * @param level - Current game level (can be used for difficulty scaling).
 */
const getRandomShapes = (
  count: number,
  level: number,
  rng: () => number
): Shape[] => {
  const result: Shape[] = [];

  for (let i = 0; i < count; i++) {
    // If bag is empty, refill it
    if (shapeBag.length === 0) {
      refillBag(rng);
    }

    // Take the next shape from the bag
    const shape = shapeBag.pop()!;

    // Generate a unique ID for this specific instance of the shape
    const uniqueId = `${shape.id}-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}-${i}`;
    result.push({ ...shape, id: uniqueId, typeId: shape.id });
  }

  return result;
};

export default function BlockBlast() {
  const rngRef = useRef<() => number>(() => Math.random());
  const movesRef = useRef<Move[]>([]);


  const { data: profile } = useUserQuery();
  const userId = profile?.id;

  const { data: pointsData } = usePointsQuery(userId);

  const dispatch = useAppDispatch();
  // --- STATE ---
  const [grid, setGrid] = useState<string[][]>(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(""))
  );
  const [availableShapes, setAvailableShapes] = useState<Shape[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMenu, setIsMenu] = useState(true);
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null);
  const [ghostPosition, setGhostPosition] = useState<{
    r: number;
    c: number;
  } | null>(null);

  const [showLevelUp, setShowLevelUp] = useState(false);
  const [refreshCount, setRefreshCount] = useState(3);
  const [points, setPoints] = useState(0);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [floatingScores, setFloatingScores] = useState<
    { id: string; score: number; x: number; y: number }[]
  >([]);

  const [maxCombo, setMaxCombo] = useState(0);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "info" | "error";
  } | null>(null);

  const onReward = useCallback(() => {
    const date = Date.now() + 10 * 60 * 1000;
    dispatch(startCooldown({ timer: date, type: "game" }));
  }, [dispatch]);

  const onError = useCallback(() => {
    // setAds(false);
  }, []);

  const { showAd, isPreparing, countdown } = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID!,
    onReward,
    onError,
  });

  useEffect(() => {
    showAd?.();
  }, []);

  const gridRef = useRef<HTMLDivElement>(null);
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const { data, mutate: finishGame } = usePointsMutation();
  const { data: sessionData, mutate: createGameSession } =
    useGameSessionMutation();

  useEffect(() => {
    if (!sessionData) return;
    rngRef.current = createSeededRandom(sessionData?.seed!);
    // setAvailableShapes(getRandomShapes(3, 1, rng))
  }, [sessionData]);

  /**
   * Resets the game state to start a new session.
   */
  const restartGame = () => {
    createGameSession();
    setGrid(
      Array(GRID_SIZE)
        .fill(null)
        .map(() => Array(GRID_SIZE).fill(""))
    );
    setAvailableShapes(getRandomShapes(3, 1, rngRef.current));
    setScore(0);
    setGameOver(false);
    setCombo(0);
    setXp(0);
    setLevel(1);
    setRefreshCount(3);
    setMaxCombo(0);
    movesRef.current = [];
    haptic.notification("success");
  };

  useEffect(() => {
    if (!pointsData) return;
    setPoints(pointsData.score);
  }, [pointsData]);


  useEffect(() => {
    if (!data) return;
    setPoints(data.score);
    // console.log(data);
  }, [data]);

  // --- EFFECTS ---

  /**
   * Initial setup: Telegram SDK, High Score retrieval, and initial shapes.
   */
  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
      tg.enableClosingConfirmation();
      document.body.style.backgroundColor =
        tg.themeParams.bg_color || "#1a1a1a";
    }

    const savedHighScore = localStorage.getItem("blockBlast_highScore");
    if (savedHighScore) setHighScore(parseInt(savedHighScore));

    const onboarded = localStorage.getItem("blockBlast_onboarded");
    if (!onboarded) {
      setShowOnboarding(true);
    }

    setAvailableShapes(getRandomShapes(3, 1, rngRef.current));
  }, []);

  /**
   * Level calculation based on current XP.
   */
  const xpToNextLevel = useMemo(() => level * 500, [level]);

  useEffect(() => {
    if (xp >= xpToNextLevel) {
      setLevel((prev) => prev + 1);
      setXp((prev) => prev - xpToNextLevel);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
      haptic.notification("success");
    }
  }, [xp, xpToNextLevel]);

  // --- GAME LOGIC ---

  /**
   * Checks if a shape can be placed at a specific grid coordinate.
   * It iterates through the shape's matrix and checks if each '1' (block)
   * falls within grid boundaries and doesn't overlap with an existing block.
   *
   * @param shape - The shape object containing the matrix.
   * @param startR - Starting row index on the grid.
   * @param startC - Starting column index on the grid.
   * @param currentGrid - The current state of the game grid.
   * @returns boolean - True if placement is valid, false otherwise.
   */
  const canPlaceShape = (
    shape: Shape,
    startR: number,
    startC: number,
    currentGrid: string[][]
  ) => {
    for (let r = 0; r < shape.matrix.length; r++) {
      for (let c = 0; c < shape.matrix[r].length; c++) {
        if (shape.matrix[r][c] === 1) {
          const gridR = startR + r;
          const gridC = startC + c;
          // Boundary check and collision check
          if (
            gridR < 0 ||
            gridR >= GRID_SIZE ||
            gridC < 0 ||
            gridC >= GRID_SIZE ||
            currentGrid[gridR][gridC] !== ""
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  /**
   * Checks if any of the available shapes can be placed anywhere on the grid.
   * This is called after every move to determine if the game has reached a 'Game Over' state.
   *
   * @param shapes - Array of shapes currently in the tray.
   * @param currentGrid - The current state of the game grid.
   * @returns boolean - True if no shapes can be placed (Game Over), false otherwise.
   */
  const checkGameOver = (shapes: Shape[], currentGrid: string[][]) => {
    for (const shape of shapes) {
      // Brute-force check every possible position on the grid for this shape
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (canPlaceShape(shape, r, c, currentGrid)) return false;
        }
      }
    }
    return true;
  };

  /**
   * Places a shape on the grid, checks for completed lines, and updates score/XP.
   * This is the core game loop function triggered when a player successfully drops a block.
   *
   * @param shape - The shape being placed.
   * @param startR - The row index where the shape is dropped.
   * @param startC - The column index where the shape is dropped.
   */
  const placeShape = (shape: Shape, startR: number, startC: number) => {
    // ✅ ДОБАВЛЯЕМ MOVE ТУТ (ОДИН РАЗ)
    const newMove = {
      shapeId: shape.typeId!,
      position: { r: startR, c: startC },
    };

    // ✅ сразу в ref (НЕ асинхронно)
    movesRef.current.push(newMove);
    const newGrid = grid.map((row) => [...row]);
    let blocksPlaced = 0;

    // 1. Fill the grid cells with the shape's color
    for (let r = 0; r < shape.matrix.length; r++) {
      for (let c = 0; c < shape.matrix[r].length; c++) {
        if (shape.matrix[r][c] === 1) {
          newGrid[startR + r][startC + c] = shape.color;
          blocksPlaced++;
        }
      }
    }

    // 2. Identify rows and columns that are now completely full
    const rowsToClear: number[] = [];
    const colsToClear: number[] = [];

    for (let r = 0; r < GRID_SIZE; r++) {
      if (newGrid[r].every((cell) => cell !== "")) rowsToClear.push(r);
    }

    for (let c = 0; c < GRID_SIZE; c++) {
      let isFull = true;
      for (let r = 0; r < GRID_SIZE; r++) {
        if (newGrid[r][c] === "") {
          isFull = false;
          break;
        }
      }
      if (isFull) colsToClear.push(c);
    }

    const linesCleared = rowsToClear.length + colsToClear.length;

    // 3. Clear the identified lines (set them back to empty strings)
    rowsToClear.forEach((r) => {
      for (let c = 0; c < GRID_SIZE; c++) newGrid[r][c] = "";
    });

    colsToClear.forEach((c) => {
      for (let r = 0; r < GRID_SIZE; r++) newGrid[r][c] = "";
    });

    // 4. Scoring logic:
    // Base points = blocks placed * 10
    // Line bonus = lines cleared * 100 (multiplied by 1.5 if more than 1 line cleared at once)
    // Combo multiplier = total points * current combo streak
    const points =
      blocksPlaced * XP_PER_BLOCK +
      linesCleared * XP_PER_LINE * (linesCleared > 1 ? COMBO_MULTIPLIER : 1);
    const finalPoints = Math.round(points * (combo > 0 ? combo : 1));

    setScore((prev) => prev + finalPoints);
    setXp((prev) => prev + finalPoints);
    setGrid(newGrid);

    // Trigger floating score at the placement position
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const centerX =
        startC * (rect.width / GRID_SIZE) +
        (shape.matrix[0].length * (rect.width / GRID_SIZE)) / 2;
      const centerY =
        startR * (rect.height / GRID_SIZE) +
        (shape.matrix.length * (rect.height / GRID_SIZE)) / 2;

      const newFloatingScore = {
        id: `score-${Date.now()}-${Math.random()}`,
        score: finalPoints,
        x: centerX,
        y: centerY,
      };

      setFloatingScores((prev) => [...prev, newFloatingScore]);
      setTimeout(() => {
        setFloatingScores((prev) =>
          prev.filter((fs) => fs.id !== newFloatingScore.id)
        );
      }, 1000);
    }

    if (linesCleared > 0) {
      setCombo((prev) => {
        const next = prev + 1;
        if (next > maxCombo) setMaxCombo(next);
        return next;
      });
      // setTotalLinesCleared((prev) => prev + linesCleared);
      haptic.notification("success");
      playSound("clear", soundEnabled);

      // Trigger screen shake for combos
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    } else {
      setCombo(0);
      haptic.impact("medium");
      playSound("place", soundEnabled);
    }

    // 5. Refill the shapes tray if all 3 shapes have been used
    const remainingShapes = availableShapes.filter((s) => s.id !== shape.id);
    if (remainingShapes.length === 0) {
      const nextShapes = getRandomShapes(3, level, rngRef.current);
      setAvailableShapes(nextShapes);
      // Check if the new set of shapes can be placed; if not, game over.
      if (checkGameOver(nextShapes, newGrid))
        handleGameOver(score + finalPoints);
    } else {
      setAvailableShapes(remainingShapes);
      // Check if remaining shapes can still be placed.
      if (checkGameOver(remainingShapes, newGrid))
        handleGameOver(score + finalPoints);
    }
  };

  /**
   * Handles game over state, updates high score.
   */
  const handleGameOver = async (finalScore: number) => {
    setGameOver(true);
    haptic.notification("error");

    if (finalScore > highScore) {
      setHighScore(finalScore);
      // localStorage.setItem("blockBlast_highScore", finalScore.toString());
    }
    // Тут реализуй окончание игры, а именно отправки результата игры

    if (sessionData?.sessionId) {
      finishGame({
        sessionId: sessionData.sessionId!,
        clientScore: finalScore,
        moves: movesRef.current,
      });
    }
  };

  /**
   * Updates drag position and calculates ghost (preview) position on the grid.
   * Обновляет положение перетаскиваемого объекта и вычисляет положение предварительного просмотра (фантомного) объекта на сетке..
   */
  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!draggedShape) return;
    const pos = "touches" in e ? e.touches[0] : e;

    // Direct DOM update for high performance (60fps)
    if (dragContainerRef.current) {
      dragContainerRef.current.style.transform = `translate3d(${pos.clientX}px, ${pos.clientY}px, 0) translate(-50%, -50%)`;
    }

    // Snap to grid logic
    if (gridRef.current) {
      const rect = gridRef.current.getBoundingClientRect();
      const currentCellSize = (rect.width - 38) / GRID_SIZE;
      const contentLeft = rect.left + 12;
      const contentTop = rect.top + 12;
      const cellWithGap = currentCellSize + 2;

      const shapeWidth =
        draggedShape.matrix[0].length * currentCellSize +
        (draggedShape.matrix[0].length - 1) * 2;
      const shapeHeight =
        draggedShape.matrix.length * currentCellSize +
        (draggedShape.matrix.length - 1) * 2;

      const shapeLeft = pos.clientX - shapeWidth / 2;
      const shapeTop = pos.clientY - shapeHeight / 2;

      const relX = shapeLeft - contentLeft;
      const relY = shapeTop - contentTop;

      const c = Math.round(relX / cellWithGap);
      const r = Math.round(relY / cellWithGap);

      if (r > -GRID_SIZE && r < GRID_SIZE && c > -GRID_SIZE && c < GRID_SIZE) {
        setGhostPosition({ r, c });
      } else {
        setGhostPosition(null);
      }
    }
  };

  /**
   * Handles dropping the shape. Places it if position is valid.
   */
  const handleDragEnd = () => {
    if (draggedShape && ghostPosition) {
      if (canPlaceShape(draggedShape, ghostPosition.r, ghostPosition.c, grid)) {
        placeShape(draggedShape, ghostPosition.r, ghostPosition.c);
      }
    }
    setDraggedShape(null);
    setGhostPosition(null);
  };

  return (
    <div
      className="flex flex-col h-full w-full max-w-md mx-auto select-none overflow-hidden bg-transparent"
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      {isMenu ? (
        <RenderMenu
          setIsMenu={setIsMenu}
          countdown={countdown}
          isPreparing={isPreparing}
          restartGame={restartGame}
          setShowLeaderboard={setShowLeaderboard}
          setShowOnboarding={setShowOnboarding}
          setOnboardingStep={setOnboardingStep}
        />
      ) : (
        <RenderGame
          restartGame={restartGame}
          score={score}
          level={level}
          setPoints={setPoints}
          points={points}
          highScore={highScore}
          gameOver={gameOver}
          gridRef={gridRef}
          dragContainerRef={dragContainerRef}
          setDraggedShape={setDraggedShape}
          GRID_SIZE={GRID_SIZE}
          haptic={haptic}
          playSound={playSound}
          soundEnabled={soundEnabled}
          refreshCount={refreshCount}
          setAvailableShapes={setAvailableShapes}
          setShowSettings={setShowSettings}
          xp={xp}
          xpToNextLevel={xpToNextLevel}
          floatingScores={floatingScores}
          getRandomShapes={getRandomShapes}
          setRefreshCount={setRefreshCount}
          availableShapes={availableShapes}
          combo={combo}
          canPlaceShape={canPlaceShape}
          ghostPosition={ghostPosition}
          draggedShape={draggedShape}
          grid={grid}
          isShaking={isShaking}
          rng={rngRef.current}
        />
      )}

      {/* Modals */}
      <AnimatePresence>
        <Settings
          key="modal-settings"
          showSettings={showSettings}
          soundEnabled={soundEnabled}
          setShowSettings={setShowSettings}
          setSoundEnabled={setSoundEnabled}
          setIsMenu={setIsMenu}
        />

        <GameOver
          key="modal-gameover"
          gameOver={gameOver}
          score={score}
          setGameOver={setGameOver}
          setShowLeaderboard={setShowLeaderboard}
          restartGame={restartGame}
        />

        <Leaderboard
          key="modal-leaderboard"
          setShowLeaderboard={setShowLeaderboard}
          showLeaderboard={showLeaderboard}
        />

        {showLevelUp && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="fixed inset-0 z-[120] pointer-events-none flex items-center justify-center"
          >
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-10 py-6 rounded-3xl border-4 border-white/20 backdrop-blur-sm">
              <h2 className="text-5xl font-black italic tracking-tighter">
                LEVEL UP!
              </h2>
              <div className="text-center text-blue-100 font-black uppercase tracking-widest text-xs mt-1">
                Difficulty Increased
              </div>
            </div>
          </motion.div>
        )}

        <Onboarding
          key="modal-onboarding"
          onboardingStep={onboardingStep}
          showOnboarding={showOnboarding}
          setOnboardingStep={setOnboardingStep}
          setShowOnboarding={setShowOnboarding}
        />
        <Toast toast={toast} key="modal-toast" />
      </AnimatePresence>
    </div>
  );
}
