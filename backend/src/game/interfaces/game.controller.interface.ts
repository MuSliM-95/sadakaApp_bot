import type { NextFunction, Request, Response } from "express";


export interface IGameController {
	getGames(req: Request, res: Response, next: NextFunction): Promise<void>
	addGame(req: Request, res: Response, next: NextFunction): Promise<void>
}