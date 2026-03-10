import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "../interfaces/middleware.interface.js";
import { UserRole } from "../../user/model/user.model.js";
import { HTTPError } from "../../errors/http.error.class.js";

export class RoleGuard implements IMiddleware {
  constructor(private readonly roles: UserRole[]) {}
  execute(req: Request, res: Response, next: NextFunction): void {
    const user = req.user!;
    // console.log(user);

    const result = this.roles.includes(user.role);
    if (!result) {
      return next(
        new HTTPError(403, "У вас нет прав на получение этих данных")
      );
    }
    next();
  }
}
