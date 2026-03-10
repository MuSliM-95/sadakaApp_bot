import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import type { IWinnerController } from "./interfaces/winner.controller.interface.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { NextFunction, Request, Response } from "express";
import type { IWinnerService } from "./interfaces/winner.service.interface.js";
import { AuthGuard } from "../common/guard/auth.guard.js";
import { RoleGuard } from "../common/guard/role.guard.js";
import { UserRole } from "../user/model/user.model.js";
import { ValidateMiddleware } from "../common/validate.midleware.js";
import { WinnerDto } from "./dto/winner.dto.js";
import { WinnerDeleteDto } from "./dto/winner.delete.dto.js";

@injectable()
export class WinnerController extends BaseController implements IWinnerController {
	constructor(
		@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
		@inject(TYPES.WinnerService) private readonly winnerService: IWinnerService,
		) {
		super(loggerService)
		this.bindRoutes([
			{
				method: 'post',
				path: '/winning-tickets',
				middlewares: [new AuthGuard(), new RoleGuard([UserRole.admin]), new ValidateMiddleware(WinnerDto)], 
				func: this.createWinner
			},
			{
				method: 'delete',
				path: '/delete-winning-tickets/:id',
				middlewares: [new AuthGuard(), new RoleGuard([UserRole.admin]), new ValidateMiddleware(WinnerDeleteDto, 'params')], 
				func: this.deleteWinner
			},  
			{
				method: 'get',
				path: '/winners',
				middlewares: [new AuthGuard()], 
				func: this.findAllWinners
			},  
		])
	}

	public async createWinner(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { ticketId } = req.body
		const data = await this.winnerService.createWinner(ticketId)

		res.status(201).json(data)
	}


	public async findAllWinners(req: Request, res: Response, next: NextFunction): Promise<void> {
		const data = await this.winnerService.findAllWinners()

		res.status(200).json(data)
	}

	public async deleteWinner(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id
		const data = await this.winnerService.deleteWinner(Number(id))

		res.status(204).json(data)
	}
}