import { type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import type { IDotenvConfig } from "../../configs/dotenv.interface.js";
import { startCommandRes } from "./helpers/bot/start.helper.js";
import type { AdsService } from "../../ads/ads.service.js";

@injectable()
export class StartCommand extends Command {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.DotenvConfig) private readonly dotenvConfig: IDotenvConfig,
    @inject(TYPES.AdsService) private readonly adsService: AdsService,
  ) {
    super();
  }
  handle(bot: Telegraf<IContextBot>): void {
    try {
      bot.start(async (ctx) => {
        const { message, markup } = startCommandRes(this.dotenvConfig);
        await this.adsService.createUser(ctx.message.chat.id)
        await ctx.reply(message, markup);
      });
    } catch (error) {
      this.loggerService.error(`[StartCommand.createUser] ${error}`);
    }
  }
}
