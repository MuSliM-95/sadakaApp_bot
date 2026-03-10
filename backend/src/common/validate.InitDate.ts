import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "./interfaces/middleware.interface.js";
import { validateWebAppData } from "@grammyjs/validator";
import type { IDotenvConfig } from "../configs/dotenv.interface.js";
import { HTTPError } from "../errors/http.error.class.js";

export class ValidateInitDate implements IMiddleware {
  constructor(private readonly dotenvServer: IDotenvConfig) {}
  public async execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const header = req.headers["x-telegram-init-data"];
      if (typeof header !== "string") return next();
      const initData = new URLSearchParams(header);
      const isValid = validateWebAppData(
        this.dotenvServer.get("BOT_TOKEN"),
        initData
      );

      if (!isValid) {
        return next(new HTTPError(422, "Данные авторизации не верны"));
      }

      const userTelegram = initData.get("user");

      if (!userTelegram) {
        return next(new HTTPError(422, "Данные авторизации не верны"));
      }

      console.log(JSON.parse(userTelegram));
      

      req.telegramUser = JSON.parse(userTelegram);

      return next();
    } catch (error) {
      return next(new HTTPError(422, "Некорректные данные пользователя"));
    }
  }
}
