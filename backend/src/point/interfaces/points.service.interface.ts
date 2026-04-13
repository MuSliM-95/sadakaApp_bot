import type { Points } from "../model/point.js";

export interface IPointsService {
  addPoints(pointsId: number, score: number): Promise<Points | null>;
  getPoints(userId: number): Promise<Points>;
  getAllPoints(): Promise<Points[]>;
}
