import type { NextFunction, Request, Response } from "express";

export interface IUserController {
	getProfile(req: Request, res: Response, next: NextFunction): Promise<void>
	getUsersAs(req: Request, res: Response, next: NextFunction): Promise<void>
}
