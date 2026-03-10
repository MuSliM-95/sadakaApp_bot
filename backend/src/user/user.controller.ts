import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import type { IUserController } from "./interface/user.controller.interface.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import { AuthGuard } from "../common/guard/auth.guard.js";
import type { IUserService } from "./interface/user.service.interface.js";
import type { NextFunction, Request, Response } from "express";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "get",
        path: "/user/profile",
        middlewares: [new AuthGuard()],
        func: this.getProfile,
      },
      {
        method: "get",
        path: "/users",
        middlewares: [new AuthGuard()],
        func: this.getUsersAs,
      },
    ]);
  }

  public async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { telegramId } = req.user!;
    const data = await this.userService.findProfile(telegramId);

    res.status(200).json(data);
  }

  // public async login(req: Request, res: Response, next: NextFunction) {}

  public async getUsersAs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await this.userService.getUsersAs();

    res.status(200).json(data);
  }
}
