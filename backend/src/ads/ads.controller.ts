import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { NextFunction, Request, Response } from "express";
import type { IAdsController } from "./interface/ads.controller.interface.js";
import type { AdsService } from "./ads.service.js";
import { AuthGuard } from "../common/guard/auth.guard.js";
import { ValidateMiddleware } from "../common/validate.midleware.js";
import { RewardDto } from "./dto/reward.js";

@injectable()
export class AdsController extends BaseController implements IAdsController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.AdsService) private readonly adsService: AdsService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "post",
        path: "/reward",
        middlewares: [new AuthGuard(), new ValidateMiddleware(RewardDto)],
        func: this.addRewards,
      },
      {
        method: "get",
        path: "/ads/ticket",
        middlewares: [new AuthGuard()],
        func: this.getAdsTicket,
      },
      {
        method: "get",
        path: "/ads/generate-token",
        middlewares: [new AuthGuard()],
        func: this.generateToken,
      },
    ]);
  }

  public async addRewards(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { telegramId, id } = req.user!;
    // const { type, token } = req.body
    const data = await this.adsService.createAds(Number(telegramId), req.body, String(id));
    res.status(200).json(data);
  }

  public async generateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.user?.id
    const data = await this.adsService.generateToken(String(userId))

    res.status(201).json(data)
  }

  public async getAdsTicket(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { telegramId } = req.user!;
    const data = await this.adsService.getAdsTicket(Number(telegramId));
    res.status(200).json(data);
  }
}
