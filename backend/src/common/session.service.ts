import { inject, injectable } from "inversify";
import type { Request } from "express";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import { HTTPError } from "../errors/http.error.class.js";
import type {
  ISessionService,
  IUserSession,
} from "./interfaces/session.service.interface.js";

@injectable()
export class SessionService implements ISessionService {
  constructor(
    @inject(TYPES.LoggerService) private loggerService: ILoggerService
  ) {}
  public async saveSession(
    req: Request,
    user: IUserSession
  ): Promise<{ user: IUserSession }> {
    return new Promise((resolve, reject) => {
      req.session.regenerate((err) => {
        if (err) {
          return reject(new HTTPError(500, "Ошибка при сохранение сессии."));
        }

        req.session.userId = user.id;
        req.session.telegramId = user.telegramId;

        req.session.save((saveErr) => {
          if (saveErr) {
            return reject(new HTTPError(500, "Ошибка при сохранение сессии."));
          }
          resolve({ user });
        });
      });
    });
  }

  public async deleteSession(req: Request): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new HTTPError(
              500,
              "Не удалось завершить сессию. Возможно, возникла проблема с сервером или сессия уже была завершена."
            )
          );
        }
        resolve();
      });
    });
  }
}
