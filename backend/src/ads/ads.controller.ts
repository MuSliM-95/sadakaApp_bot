import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { NextFunction, Request, Response } from "express";
import type { IAdsController } from "./ads.controller.interface.js";

@injectable()
export class AdsController extends BaseController implements IAdsController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService
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
    res.status(200).json({ message: "Ok" });
  }
}
