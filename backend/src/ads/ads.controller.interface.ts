import type { NextFunction, Request, Response } from "express";

export interface IAdsController {
  getRewards(req: Request, res: Response, next: NextFunction): Promise<void>;
}
