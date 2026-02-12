import { Markup, type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import { menu } from "./helpers/bot/buttons.js";
import { message } from "telegraf/filters";

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

      bot.on(message("successful_payment"), async (ctx) => {
        console.log("SUCCESSFUL PAYMENT:", ctx.message.successful_payment);
      
        await ctx.reply(
          "ДжазакаЛлаху Хайран!",
          Markup.inlineKeyboard([[menu]])
        );
      });

      bot.on("successful_payment", async (ctx) => {
        await ctx.reply(
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
