import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "../interfaces/middleware.interface.js";
import { HTTPError } from "../../errors/http.error.class.js";

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (!req.user) {
      return next(new HTTPError(401, "Не авторизованы"));
    }

    next();
  }
}
