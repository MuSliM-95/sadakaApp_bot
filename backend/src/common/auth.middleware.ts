import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "./interfaces/middleware.interface.js";
import type { IDotenvConfig } from "../configs/dotenv.interface.js";
import type { IUserService } from "../user/interface/user.service.interface.js";

export class AuthMiddleware implements IMiddleware {
  constructor(
    private dotenvConfig: IDotenvConfig,
    private userService: IUserService
  ) {}
  async execute( req: Request, res: Response, next: NextFunction ): Promise<void> {
    if (req.session.telegramId) {
      const isExists = await this.userService.getUser(req.session.telegramId);      
      req.user = isExists;
      next();
    } else {
      next();
    }
  }
}
