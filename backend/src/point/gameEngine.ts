import type { Move, Shape } from "./interfaces/points.service.interface.js";

export const GRID_SIZE = 8;

export const SHAPES: Record<string, Shape> = {
  "1x1": { id: "1x1", matrix: [[1]] },
  "1x2": { id: "1x2", matrix: [[1, 1]] },
  "1x3": { id: "1x3", matrix: [[1, 1, 1]] },
  "1x4": { id: "1x4", matrix: [[1, 1, 1, 1]] },

  "2x2": {
    id: "2x2",
    matrix: [
      [1, 1],
      [1, 1],
    ],
  },

  "3x3": {
    id: "3x3",
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  },

  L: {
    id: "L",
    matrix: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
  },

  "L-rev": {
    id: "L-rev",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
    ],
  },

  T: {
    id: "T",
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
    ],
  },

  Z: {
    id: "Z",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },

  S: {
    id: "S",
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },

  "3x3-corner": {
    id: "3x3-corner",
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
  },

  "3x3-corner-2": {
    id: "3x3-corner-2",
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
  },

  "3x3-corner-3": {
    id: "3x3-corner-3",
    matrix: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 1],
    ],
  },

  "3x3-corner-4": {
    id: "3x3-corner-4",
    matrix: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1],
    ],
  },

  "corner-2x2-1": {
    id: "corner-2x2-1",
    matrix: [
      [1, 1],
      [1, 0],
    ],
  },

  "corner-2x2-2": {
    id: "corner-2x2-2",
    matrix: [
      [1, 1],
      [0, 1],
    ],
  },

  "corner-2x2-3": {
    id: "corner-2x2-3",
    matrix: [
      [1, 0],
      [1, 1],
    ],
  },

  "corner-2x2-4": {
    id: "corner-2x2-4",
    matrix: [
      [0, 1],
      [1, 1],
    ],
  },

  "3x2": {
    id: "3x2",
    matrix: [
      [1, 1, 1],
      [1, 1, 1],
    ],
  },

  "4x2": {
    id: "4x2",
    matrix: [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
    ],
  },

  "2x1": { id: "2x1", matrix: [[1], [1]] },
  "3x1": { id: "3x1", matrix: [[1], [1], [1]] },
  "4x1": { id: "4x1", matrix: [[1], [1], [1], [1]] },

  "1x5": { id: "1x5", matrix: [[1, 1, 1, 1, 1]] },
  "5x1": { id: "5x1", matrix: [[1], [1], [1], [1], [1]] },

  "side-t-left": {
    id: "side-t-left",
    matrix: [
      [1, 0],
      [1, 1],
      [1, 0],
    ],
  },

  "side-t-right": {
    id: "side-t-right",
    matrix: [
      [0, 1],
      [1, 1],
      [0, 1],
    ],
  },

  "diag-left": {
    id: "diag-left",
    matrix: [
      [1, 0],
      [0, 1],
    ],
  },

  "diag-right": {
    id: "diag-right",
    matrix: [
      [0, 1],
      [1, 0],
    ],
  },
};

export class GameEngine {
  createEmptyGrid(): string[][] {
    return Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(""));
  }



  simulateGame(seed: number, moves: Move[]) {
    const grid = this.createEmptyGrid();
  
    let score = 0;
    let combo = 0;
  
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]!;
      const shape = SHAPES[move.shapeId]!;
  
      if (!shape) {
        throw new Error("Bad request");
      }
  
      // --- PLACE SHAPE ---
      let blocks = 0;
  
      for (let r = 0; r < shape.matrix.length; r++) {
        for (let c = 0; c < shape.matrix[r].length; c++) {
          if (shape.matrix[r][c] === 1) {
            const gr = move.position.r + r;
            const gc = move.position.c + c;
  
            // ⚠️ игнорируем проверки (как клиент фактически)
            if (gr >= 0 && gr < GRID_SIZE && gc >= 0 && gc < GRID_SIZE) {
              grid[gr][gc] = "x";
              blocks++;
            }
          }
        }
      }
  
      // --- CLEAR LINES ---
      let rowsToClear: number[] = [];
      let colsToClear: number[] = [];
  
      for (let r = 0; r < GRID_SIZE; r++) {
        if (grid[r].every((cell) => cell !== "")) rowsToClear.push(r);
      }
  
      for (let c = 0; c < GRID_SIZE; c++) {
        let full = true;
        for (let r = 0; r < GRID_SIZE; r++) {
          if (grid[r][c] === "") {
            full = false;
            break;
          }
        }
        if (full) colsToClear.push(c);
      }
  
      const lines = rowsToClear.length + colsToClear.length;
  
      // очистка
      rowsToClear.forEach((r) => {
        for (let c = 0; c < GRID_SIZE; c++) grid[r][c] = "";
      });
  
      colsToClear.forEach((c) => {
        for (let r = 0; r < GRID_SIZE; r++) grid[r][c] = "";
      });
  
      // --- SCORE (как на клиенте) ---
      const base =
        blocks * 10 +
        lines * 100 * (lines > 1 ? 1.5 : 1);
  
      const finalPoints = Math.round(base * (combo > 0 ? combo : 1));
  
      score += finalPoints;
  
      // --- COMBO ---
      if (lines > 0) {
        combo += 1;
      } else {
        combo = 0;
      }
    }
  
    return { score, grid };
  }
}
