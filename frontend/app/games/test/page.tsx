// pages/index.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const GRID_WIDTH = 8;
const GRID_HEIGHT = 8;
const BLOCK_SIZE = 60;
const GRID_Y_OFFSET = 150;
const ANIMATION_DURATION = 13;
const MAGNETIC_RANGE = 30;

type Color = string;

type Vector2 = { x: number; y: number };

type GridCell = { occupied: boolean; color: Color; clearing: boolean };

type Block = {
  rects: Vector2[];
  color: Color;
  dragging: boolean;
  active: boolean;
  originalPos: Vector2[];
};

type BlockShape = { count: number; offsets: Vector2[] };

const blockShapes: BlockShape[] = [
  { count: 4, offsets: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }] },
  { count: 4, offsets: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }] },
  { count: 4, offsets: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 1 }] },
  // добавь остальные формы по необходимости
];

const colors = ["#ff4d4f", "#52c41a", "#1890ff", "#faad14", "#722ed1", "#ffc53d"];

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [grid, setGrid] = useState<GridCell[][]>(
    Array.from({ length: GRID_HEIGHT }, () =>
      Array.from({ length: GRID_WIDTH }, () => ({ occupied: false, color: "#ccc", clearing: false }))
    )
  );
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [draggingBlock, setDraggingBlock] = useState<Block | null>(null);
  const [mouseOffset, setMouseOffset] = useState<Vector2>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [scoreMult, setScoreMult] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [clearAnim, setClearAnim] = useState<{ active: boolean; frame: number; rows: boolean[]; cols: boolean[] }>({
    active: false,
    frame: 0,
    rows: Array(GRID_HEIGHT).fill(false),
    cols: Array(GRID_WIDTH).fill(false),
  });

  const canvasWidth = 900;
  const canvasHeight = 1000;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    // Инициализация блоков
    if (blocks.length === 0) {
      const newBlocks = Array.from({ length: 3 }, (_, i) => generateRandomBlock(i));
      setBlocks(newBlocks);
    }

    let animationFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Фон
      ctx.fillStyle = "#f0f2f5";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Сетка
      ctx.strokeStyle = "#999";
      for (let i = 0; i <= GRID_WIDTH; i++) {
        ctx.beginPath();
        ctx.moveTo((canvasWidth - GRID_WIDTH * BLOCK_SIZE) / 2 + i * BLOCK_SIZE, GRID_Y_OFFSET);
        ctx.lineTo((canvasWidth - GRID_WIDTH * BLOCK_SIZE) / 2 + i * BLOCK_SIZE, GRID_Y_OFFSET + GRID_HEIGHT * BLOCK_SIZE);
        ctx.stroke();
      }
      for (let j = 0; j <= GRID_HEIGHT; j++) {
        ctx.beginPath();
        ctx.moveTo((canvasWidth - GRID_WIDTH * BLOCK_SIZE) / 2, GRID_Y_OFFSET + j * BLOCK_SIZE);
        ctx.lineTo((canvasWidth - GRID_WIDTH * BLOCK_SIZE) / 2 + GRID_WIDTH * BLOCK_SIZE, GRID_Y_OFFSET + j * BLOCK_SIZE);
        ctx.stroke();
      }

      // Отрисовка ячеек
      for (let row = 0; row < GRID_HEIGHT; row++) {
        for (let col = 0; col < GRID_WIDTH; col++) {
          const cell = grid[row][col];
          if (cell.occupied) {
            ctx.fillStyle = cell.color;
            ctx.fillRect(
              (canvasWidth - GRID_WIDTH * BLOCK_SIZE) / 2 + col * BLOCK_SIZE,
              GRID_Y_OFFSET + row * BLOCK_SIZE,
              BLOCK_SIZE,
              BLOCK_SIZE
            );
            ctx.strokeStyle = "#000";
            ctx.strokeRect(
              (canvasWidth - GRID_WIDTH * BLOCK_SIZE) / 2 + col * BLOCK_SIZE,
              GRID_Y_OFFSET + row * BLOCK_SIZE,
              BLOCK_SIZE,
              BLOCK_SIZE
            );
          }
        }
      }

      // Отрисовка блоков
      blocks.forEach((b) => {
        if (!b.active) return;
        ctx.fillStyle = b.color;
        b.rects.forEach((r) => {
          ctx.fillRect(r.x, r.y, BLOCK_SIZE, BLOCK_SIZE);
          ctx.strokeStyle = "#000";
          ctx.strokeRect(r.x, r.y, BLOCK_SIZE, BLOCK_SIZE);
        });
      });

      // UI
      ctx.fillStyle = "#555";
      ctx.fillRect(0, canvasHeight - 55, canvasWidth, 55);
      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.fillText(`Score: ${score}`, 20, canvasHeight - 20);

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, [blocks, grid, score]);

  const generateRandomBlock = (index: number): Block => {
    const shapeType = Math.floor(Math.random() * blockShapes.length);
    const shape = blockShapes[shapeType];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = 180 + index * 260;
    const startY = 760;
    const rects = shape.offsets.map((o) => ({ x: startX + o.x * BLOCK_SIZE, y: startY + o.y * BLOCK_SIZE }));
    return { rects, color, dragging: false, active: true, originalPos: [...rects] };
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} style={{ borderRadius: 16, boxShadow: "0 0 20px rgba(0,0,0,0.3)" }} />
    </div>
  );
}