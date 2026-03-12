import { validateWebAppData } from "@grammyjs/validator";
import type { IAuthService } from "./interfaces/auth.service.interface.js";
import type { Request } from "express";
import { HTTPError } from "../errors/http.error.class.js";
import type { AuthDto } from "./dto/login.dto.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { IDotenvConfig } from "../configs/dotenv.interface.js";
import type { ISessionService } from "../common/interfaces/session.service.interface.js";
import type { IUserService } from "../user/interface/user.service.interface.js";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(TYPES.DotenvConfig) private readonly dotenvServer: IDotenvConfig,
    @inject(TYPES.SessionService)
    private readonly sessionService: ISessionService,
    @inject(TYPES.UserService) private readonly userServer: IUserService
  ) {}
  public async login(req: Request, body: AuthDto): Promise<void> {
    const initData = new URLSearchParams(body.initData);
    const isValid = validateWebAppData(
      this.dotenvServer.get("BOT_TOKEN"),
      initData
    );

    if (!isValid) {
      throw new HTTPError(422, "Данные авторизации не верны");
    }
    const userTelegram = initData.get("user");

    if (!userTelegram) {
      throw new HTTPError(422, "Данные авторизации не верны");
    }
   
    const telegramSession = JSON.parse(userTelegram);

    const user = await this.userServer.getUser(telegramSession.id);

    if (user?.username !== telegramSession.username) {
      await this.userServer.updateUser(user?.telegramId!, telegramSession.username);
    }

    await this.sessionService.saveSession(req, {
      id: user!.id,
      telegramId: user!.telegramId!,
      role: user!.role,
    });
  }
}
