import type { NextFunction, Request, Response } from "express";

export interface IAdsController {
  addRewards(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAdsTicket(req: Request, res: Response, next: NextFunction): Promise<void>;
  generateToken(req: Request, res: Response, next: NextFunction): Promise<void>;
}
