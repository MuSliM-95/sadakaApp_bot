import { dedent } from "ts-dedent";
import type { IDotenvConfig } from "../../../../configs/dotenv.interface.js";
import { Markup } from "telegraf";

export const startCommandRes = (dotenvConfig: IDotenvConfig) => {
  return {
    message: dedent(`
	САДАКА-САГ1А — тестовая версия рекламной платформы для Telegram Mini Apps.
  
	На данном этапе проводится техническая проверка системы:
	— интеграции рекламных блоков
	— стабильности сервиса
	— пользовательских сценариев
	
	Функциональность может меняться. Полный запуск — скоро.
	`),
    markup: Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          "САДАКА-САГ1А",
          `${dotenvConfig.get("WAYPAMEURL_ADS")}`
        ),
      ],
      [
        Markup.button.callback("Партнерские проекты", "affiliate_projects"),
        Markup.button.callback("⚙ Прочее", "other"),
      ],
    ]),
  };
};
