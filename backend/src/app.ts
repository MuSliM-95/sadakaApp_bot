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
    @multiInject(TYPES.BotCommands) private readonly botCommands: Command[]
  ) {
    this._bot = new Telegraf(this.dotenvConfig.get("BOT_TOKEN"));
    this._app = express();
    this._port = Number(this.dotenvConfig.get("API_PORT")) || 9004;
  }

  public useMiddlewares() {
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(helmet());
  }

  public useExceptionFilter(): void {
		this._app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

  public useRoutes() {
    this._app.use("/api", this.adsController.router);
  }

  public async init() {
    this.useMiddlewares();
    this.useRoutes();
    this.useExceptionFilter()
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
