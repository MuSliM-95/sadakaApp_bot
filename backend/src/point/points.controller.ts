import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";

import { TYPES } from "../types.js";
import type { Request, Response, NextFunction } from "express";
import type { ILoggerService } from "../logger/logger.service.interface.js";

import { AuthGuard } from "../common/guard/auth.guard.js";
import type { IPointsController } from "./interfaces/points.controller.interface.js";
import type { IPointsService } from "./interfaces/points.service.interface.js";
import { ValidateMiddleware } from "../common/validate.midleware.js";
import { GameFinishDto } from "./dto/points.dto.js";

@injectable()
export class PointsController
  extends BaseController
  implements IPointsController
{
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.PointsService) private readonly pointsService: IPointsService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "get",
        path: "/game/points",
        middlewares: [new AuthGuard()],
        func: this.getPoints,
      },
      {
        method: "get",
        path: "/game/points/all",
        middlewares: [new AuthGuard()],
        func: this.findPointsAll,
      },
      // {
      //   method: "patch",
      //   path: "/points/update",
      //   middlewares: [new AuthGuard()],
      //   func: this.getPoints,
      // },
      {
        method: "post",
        path: "/game/finish",
        middlewares: [new AuthGuard(), new ValidateMiddleware(GameFinishDto)],
        func: this.gameFinish,
      },
      {
        method: "post",
        path: "/game/start",
        middlewares: [new AuthGuard()],
        func: this.gameSession,
      },
    ]);
  }

  public async getPoints(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.user!;
    const data = await this.pointsService.getPoints(id);

    res.json(data);
  }
  public async gameFinish(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.user!;
    const { sessionId, moves, clientScore } = req.body;
    const result = await this.pointsService.gameFinish(
      sessionId,
      id,
      moves,
      clientScore
    );

    if (!result) {
      res.status(204).send();
      return;
    }

    res.status(200).json(result);
  }
  public async findPointsAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await this.pointsService.getAllPoints();

    res.json(data);
  }

  public async gameSession(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const sessionData = await this.pointsService.gameSession(req.user?.id!);

    res.status(200).json(sessionData);
  }
}
