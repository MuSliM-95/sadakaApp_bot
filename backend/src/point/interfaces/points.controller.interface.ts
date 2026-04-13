import type { NextFunction, Request, Response } from "express";

export interface IPointsController {
  addPoints(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPoints(req: Request, res: Response, next: NextFunction): Promise<void>;
  findPointsAll(req: Request, res: Response, next: NextFunction): Promise<void>;
}
