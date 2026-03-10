import cors from "cors";
import { Server } from "http";
import { inject, injectable, multiInject } from "inversify";
import { TYPES } from "./types.js";
import type { Command } from "./bot/commands/command.class.js";
import { Telegraf } from "telegraf";
import type { IContextBot } from "./bot/context/bot.context.interface.js";
import type { IDotenvConfig } from "./configs/dotenv.interface.js";
import type { ILoggerService } from "./logger/logger.service.interface.js";
import express, { type Express } from "express";
import type { AdsController } from "./ads/ads.controller.js";
import { createRequire } from "node:module";
import type { IExceptionFilter } from "./errors/exception.filter.interface.js";
import type { ISequelizeService } from "./db/sequelize.interface.js";
import type { TicketController } from "./ticket/ticket.controller.js";
import session from "express-session";
import type { SessionConfig } from "./configs/session.config.js";
import { AuthMiddleware } from "./common/auth.middleware.js";
import type { UserController } from "./user/user.controller.js";
import type { IUserService } from "./user/interface/user.service.interface.js";
import type { AuthController } from "./auth/auth.controller.js";
import cookieParser from "cookie-parser";
import type { WinnerController } from "./winner/winner.controller.js";

const require = createRequire(import.meta.url);
const helmet = require("helmet");

@injectable()
export class App {
  private _app: Express;
  private _port: number;
  private _bot: Telegraf<IContextBot>;
  _server: Server;

  constructor(
    @inject(TYPES.DotenvConfig) private readonly dotenvConfig: IDotenvConfig,
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.AdsController) private readonly adsController: AdsController,
    @inject(TYPES.WinnerController) private readonly winnerController: WinnerController,
    @inject(TYPES.AuthController)
    private readonly authController: AuthController,
    @inject(TYPES.TicketController)
    private readonly ticketController: TicketController,
    @inject(TYPES.UserController)
    private readonly userController: UserController,
    @inject(TYPES.UserService) private readonly userService: IUserService,
    @inject(TYPES.SessionConfig) private readonly sessionConfig: SessionConfig,
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService,
    @multiInject(TYPES.BotCommands) private readonly botCommands: Command[]
  ) {
    this._bot = new Telegraf(this.dotenvConfig.get("BOT_TOKEN"));
    this._app = express();
    this._port = Number(this.dotenvConfig.get("API_PORT")) || 9004;
  }

  public useMiddlewares() {
    this._app.use(
      cors({ origin: "https://parser-client.cloudpub.ru", credentials: true })
    );
    this._app.use(express.json());
    this._app.set('trust proxy', 1);
    this._app.use(cookieParser());

    this._app.use(session(this.sessionConfig));
    const authMiddleware = new AuthMiddleware(
      this.dotenvConfig,
      this.userService
    );
    this._app.use(authMiddleware.execute.bind(authMiddleware));
    this._app.use(helmet());
  }

  public useExceptionFilter(): void {
    this._app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public useRoutes() {
    this._app.use("/api", this.authController.router);
    this._app.use("/api", this.adsController.router);
    this._app.use("/api", this.ticketController.router);
    this._app.use("/api", this.userController.router);
    this._app.use("/api", this.winnerController.router);
    // this._app.use("/api", this.authController.router);
  }

  public async init() {
    this.useMiddlewares();
    await this.sequelize.connect();
    this.useRoutes();
    this.useExceptionFilter();
    const host = this.dotenvConfig.get("API_SERVER") || `localhost`;
    this._server = this._app.listen(this._port, host);
    this.loggerService.log(`Сервер запушен на http://${host}:${this._port}`);
    for (const command of this.botCommands) {
      command.handle(this._bot);
    }

    await this._bot.launch();

    this.loggerService.log("[App] Приложение запущенно.");
  }
}
