import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import type { IGameController } from "./interfaces/game.controller.interface.js";
import { TYPES } from "../types.js";
import type { Request, Response, NextFunction } from "express";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { IGameService } from "./interfaces/game.service.interface.js";
import { AuthGuard } from "../common/guard/auth.guard.js";
import { RoleGuard } from "../common/guard/role.guard.js";
import { UserRole } from "../user/model/user.model.js";
import { ValidateMiddleware } from "../common/validate.midleware.js";
import { GameDto } from "./dto/game.dto.js";

@injectable()
export class GameController extends BaseController implements IGameController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.GameService) private readonly gameService: IGameService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "get",
        path: "/games",
        middlewares: [new AuthGuard()],
        func: this.getGames,
      },
      {
        method: "post",
        path: "/games/add",
        middlewares: [
          new AuthGuard(),
          new RoleGuard([UserRole.admin]),
          new ValidateMiddleware(GameDto),
        ],
        func: this.addGame,
      },
    ]);
  }

  public async addGame(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await this.gameService.addGame(req.body);
    
    res.json(data);
  }

  public async getGames(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await this.gameService.getGames();

    res.json(data);
  }
}
