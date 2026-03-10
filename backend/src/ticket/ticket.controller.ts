import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { TYPES } from "../types.js";
import type { ITicketService } from "./interface/ticket.service.interface.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { NextFunction, Request, Response } from "express";
import type { ITicketController } from "./interface/ticket.controller.interface.js";
import { AuthGuard } from "../common/guard/auth.guard.js";
import { RoleGuard } from "../common/guard/role.guard.js";
import { UserRole } from "../user/model/user.model.js";
import { ValidateMiddleware } from "../common/validate.midleware.js";
import { TicketDto } from "./dto/ticket.dto.js";

@injectable()
export class TicketController
  extends BaseController
  implements ITicketController
{
  constructor(
    @inject(TYPES.TicketService) private readonly ticketService: ITicketService,
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "get",
        path: "/tickets/user",
        middlewares: [new AuthGuard()],
        func: this.getTickets,
      },
      {
        method: "get",
        path: "/tickets-count",
        middlewares: [new AuthGuard()],
        func: this.getTicketsCount,
      },
      {
        method: "get",
        path: "/tickets/:id",
        middlewares: [new AuthGuard(), new RoleGuard([UserRole.admin]), new ValidateMiddleware(TicketDto, 'params')],
        func: this.getTicket,
      }

    ]);
  }

  public async getTickets(req: Request, res: Response, next: NextFunction) {
    const { telegramId } = req.user!;

    const data = await this.ticketService.getTickets(Number(telegramId));

    res.status(200).json(data);
  }

  public async getTicket(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params!;

    const data = await this.ticketService.getTicket(Number(id));

    res.status(200).json(data);
  }

  public async getTicketsCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { telegramId } = req.user!;

    const data = await this.ticketService.getTicketsCount(Number(telegramId));

    res.status(200).json(data);
  }
}
