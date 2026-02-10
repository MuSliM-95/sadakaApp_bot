import { Markup, type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import { menu } from "./helpers/bot/buttons.js";

@injectable()
export class PaymentOn extends Command {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService
  ) {
    super();
  }
  handle(bot: Telegraf<IContextBot>): void {
    try {
      bot.on("pre_checkout_query", async (ctx) => {
        await ctx.answerPreCheckoutQuery(true);
        return;
      });
      bot.on("successful_payment", async (ctx) => {
        await ctx.editMessageText(
          "ДжазакаЛлаху Хайран!",
          Markup.inlineKeyboard([[menu]])
        );
        return;
      });
    } catch (error) {
      this.loggerService.error(`[PaymentOn] ${error}`);
    }
  }
}
