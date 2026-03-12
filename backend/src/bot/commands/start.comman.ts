import { type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import type { IDotenvConfig } from "../../configs/dotenv.interface.js";
import { startCommandRes } from "./helpers/bot/start.helper.js";
import type { AdsService } from "../../ads/ads.service.js";
import type { IUserService } from "../../user/interface/user.service.interface.js";


@injectable()
export class StartCommand extends Command {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.DotenvConfig) private readonly dotenvConfig: IDotenvConfig,
    @inject(TYPES.AdsService) private readonly adsService: AdsService,
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {
    super();
  }
  handle(bot: Telegraf<IContextBot>): void {
    try {
      bot.start(async (ctx) => {
        const chat = ctx.message.chat;
        const username = "username" in chat ? chat.username : null;
        const first_name = "first_name" in chat ? chat.first_name : null;
        const id = chat.id;

        const { message, markup } = startCommandRes(this.dotenvConfig);
        await this.userService.createUser({
          telegramId: id,
          username: username,
          first_name: first_name,
        });
        await ctx.reply(message, markup);
      });
    } catch (error) {
      this.loggerService.error(`[StartCommand.createUser] ${error}`);
    }
  }
}
