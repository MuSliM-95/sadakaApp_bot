import type { Points } from "../model/point.js";

export type GameSessionType = { sessionId: string; seed: number };

export type Shape = {
  id: string;
  matrix: number[][];
};

export type Move = {
  shapeId: string;
  position: { r: number; c: number };
};

export interface IPointsService {
  gameFinish(sessionId: string, userId: number, moves: Move[], clientScore: number): Promise<Points | null>;
  getPoints(userId: number): Promise<Points>;
  getAllPoints(): Promise<Points[]>;
  gameSession(userId: number): Promise<GameSessionType>;
}
