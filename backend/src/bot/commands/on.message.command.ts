import { Markup, type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import { dedent } from "ts-dedent";
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

        if (text === "⚙ Прочее") {
          await ctx.reply(
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
            ])
          );
        }

        if (text === "👀 Смотреть рекламу") {
          await ctx.reply(
            dedent(
              `📺 Реклама
	
	Вы можете просмотреть рекламу в браузере Telegram либо в браузере вашего устройства.\n
	Смотря рекламу, вы помогаете нам развивать наши продукты, а также мы жертвуем часть средств нуждающимся.`
            ),
            Markup.inlineKeyboard([
              [
                Markup.button.webApp(
                  "Открыть в Telegram",
                  `${this.dotenvConfig.get("WAYPAMEURL_ADS")}`
                ),
              ],
              [
                Markup.button.url(
                  "Открыть в браузере",
                  `${this.dotenvConfig.get("WAYPAMEURL_ADS")}`
                ),
              ],
            ])
          );
        }
      });
    } catch (error) {
      this.loggerService.error(`[OnMessageCommand] ${error}`);
    }
  }
}
