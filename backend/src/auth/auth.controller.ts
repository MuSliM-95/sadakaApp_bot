import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { NextFunction, Request, Response } from "express";
import type { IAuthController } from "./interfaces/auth.controller.interface.js";
import type { IAuthService } from "./interfaces/auth.service.interface.js";
import { ValidateMiddleware } from "../common/validate.midleware.js";
import { AuthDto } from "./dto/login.dto.js";

@injectable()
export class AuthController extends BaseController implements IAuthController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.AuthService) private readonly authService: IAuthService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "post",
        path: "/auth/telegram",
        middlewares: [new ValidateMiddleware(AuthDto)],
        func: this.login,
      },
    ]);
  }

  public async login(req: Request, res: Response, next: NextFunction) {    
    await this.authService.login(req, req.body);

    res.status(200).json({ message: "ok" });
  }
}
