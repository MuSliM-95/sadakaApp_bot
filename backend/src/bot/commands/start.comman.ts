import { Markup, type Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types.js";
import type { ILoggerService } from "../../logger/logger.service.interface.js";
import { dedent } from "ts-dedent";

@injectable()
export class StartCommand extends Command {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
  ) {
    super();
  }
  handle(bot: Telegraf<IContextBot>): void {
    try {
      bot.start(async (ctx) => {
        ctx.reply(
          dedent(`
        AdvertisingApp — тестовая версия рекламной платформы для Telegram Mini Apps.

        На данном этапе проводится техническая проверка системы:
        — интеграции рекламных блоков
        — стабильности сервиса
        — пользовательских сценариев
        
        Функциональность может меняться. Полный запуск — скоро.
        `),
          Markup.keyboard([
            [Markup.button.text("👀 Смотреть рекламу")],
            [Markup.button.text("⚙ Прочее")],
          ]).resize()
        );
      });
    } catch (error) {
      this.loggerService.error(`[StartCommand.createUser] ${error}`);
    }
  }
}
