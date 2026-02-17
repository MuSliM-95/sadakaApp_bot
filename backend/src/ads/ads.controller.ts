import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { NextFunction, Request, Response } from "express";
import type { IAdsController } from "./ads.controller.interface.js";
import type { AdsService } from "./ads.service.js";

@injectable()
export class AdsController extends BaseController implements IAdsController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.AdsService) private readonly adsService: AdsService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "get",
        path: "/reward",
        middlewares: [],
        func: this.getRewards,
      },
    ]);
  }

  public async getRewards(req: Request, res: Response, next: NextFunction) {
    await this.adsService.updateState();
    console.log('yes');
    
    res.status(200).json({ message: "Ok" });
  }
}
