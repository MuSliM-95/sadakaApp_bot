import { Markup, type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import type { IDotenvConfig } from "../../configs/dotenv.interface.js";


@injectable()
export class OnMessageCommand extends Command {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.DotenvConfig) private readonly dotenvConfig: IDotenvConfig
  ) {
    super();
  }
  handle(bot: Telegraf<IContextBot>): void {
    try {
      bot.on("message", async (ctx) => {
        if (!("text" in ctx.update.message)) return;

        const { text } = ctx.update.message;

        if (
          "reply_to_message" in ctx.message &&
          "text" in ctx.message.reply_to_message &&
          ctx.message.reply_to_message.text.includes("Введите сумму")
        ) {
          const { message_id } = ctx.message;

          await ctx.deleteMessages([message_id, message_id - 1]);
          const amount = Number(text);
          if (isNaN(amount) || amount <= 0) {
            await ctx.reply(
              "Введите только цифры, и не ниже 0! Попробуй еще раз."
            );
            return;
          }
          await ctx.reply(
            `Пожертвовать ${amount} ⭐`,
            Markup.inlineKeyboard([
              Markup.button.callback(`⭐ ${amount}`, `pay-${amount}`),
            ])
          );
        }
      });


    } catch (error) {
      this.loggerService.error(`[OnMessageCommand] ${error}`);
    }
  }
}
