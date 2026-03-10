import type { NextFunction, Request, Response } from "express";

export interface IWinnerController {
  createWinner(req: Request, res: Response, next: NextFunction): Promise<void>;
  findAllWinners(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteWinner(req: Request, res: Response, next: NextFunction): Promise<void>
}