import type { NextFunction, Request, Response } from "express";

export interface ICategoryController {
	getCategories(req: Request, res: Response, next: NextFunction): Promise<void>
}