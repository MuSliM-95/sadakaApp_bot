import { Markup, type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import type { IDotenvConfig } from "../../configs/dotenv.interface.js";
import { dedent } from "ts-dedent";
import { startCommandRes } from "./helpers/bot/start.helper.js";
import { back } from "./helpers/bot/buttons.js";

@injectable()
export class ActionCallback extends Command {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.DotenvConfig) private readonly dotenvConfig: IDotenvConfig
  ) {
    super();
  }
  handle(bot: Telegraf<IContextBot>): void {
    try {
      bot.action("other", async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.editMessageText(
          dedent(`
				⚙️ Прочее\n\n📣 Подпишитесь на канал, чтобы получать актуальные новости и оставаться на связи.. 
			  `),
          Markup.inlineKeyboard([
            [
              Markup.button.url(
                "📣 Новости",
                `${this.dotenvConfig.get("NEWS")}`
              ),
            ],
            [
              Markup.button.url(
                "👨‍✈️ Поддержка",
                `${this.dotenvConfig.get("SUPPORT")}`
              ),
            ],
            [Markup.button.callback("⭐ Поддержать проект", "donate")],
            [back],
          ])
        );
      });

      bot.action("menu", async (ctx) => {
        const { message, markup } = startCommandRes(this.dotenvConfig);
        await ctx.editMessageText(message, markup);
      });

      bot.action("affiliate_projects", async (ctx) => {
        await ctx.editMessageText(
          "Скоро здесь появятся проекты наших друзей и партнеров, по воле Аллаха.",
          Markup.inlineKeyboard([[back]])
        );
      });

      bot.action("donate", async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.editMessageText(
          dedent(`🤍 <b>Поддержать проект</b>

			Наш проект существует и развивается благодаря вашей поддержке.
			Каждый вклад — это участие в общем благом деле.
			
			Вы можете поддержать нас удобным способом:
			
			⭐ <b>Telegram Stars</b>
			Быстро, безопасно и прямо внутри Telegram.
			
			💎 <b>Криптовалюта</b>
			Мы принимаем пожертвования в сетях:
			
			<b>USDT (TRC20)</b>
			Адрес: <code>${this.dotenvConfig.get("TRC20_ADDRESS_HERE")}</code>
			
			<b>USDT (BEP20 / BNB Smart Chain)</b>
			Адрес: <code>${this.dotenvConfig.get("BEP20_ADDRESS_HERE")}</code>
			
			<b>TON</b>
			Адрес: <code>${this.dotenvConfig.get("TON_ADDRESS_HERE")}</code>
			
			Спасибо, что помогаете проекту расти 🤍
			Ин ша Аллах, он принесет пользу всей Умме.`),
          {
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [Markup.button.callback("⭐️ Telegram Stars", "stars-donate")],
                [Markup.button.callback("🔙 Назад", "other")],
              ],
            },
          }
        );
      });

      bot.action("stars-donate", async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.reply(
          "Введите сумму",
          Markup.forceReply().placeholder("Пример: 100")
        );
      });

      bot.action(/^pay-\d+$/, async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage();
        const amount = ctx.match[0].split("-")[1];

        await ctx.replyWithInvoice({
          title: "Поддержать проект",
          description: "Пожертвование",
          payload: "donation_payload", // Внутренний ID платежа
          currency: "XTR", // Валюта — Telegram Stars
          prices: [{ label: `${amount} Stars`, amount: Number(amount) }],

          // Количество звезд
          provider_token: "", // Для Stars оставляем пустым
        });
      });
    } catch (error) {
      this.loggerService.error(`[ActionCallback] ${error}`);
    }
  }
}
