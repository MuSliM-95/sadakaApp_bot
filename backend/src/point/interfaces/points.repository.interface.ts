import type { Points } from "../model/point.js";

export interface IPointsRepository {
  create(score: number, userId: number): Promise<Points>;
  findOne(userId: number): Promise<Points | null>;
  findByPk(pointsId: number): Promise<Points | null>;
  addPoints(userId: number, score: number): Promise<Points[]>;
  findAll(): Promise<Points[]>;
}
