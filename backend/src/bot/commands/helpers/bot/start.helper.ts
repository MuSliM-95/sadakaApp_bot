import { dedent } from "ts-dedent";
import type { IDotenvConfig } from "../../../../configs/dotenv.interface.js";
import { Markup } from "telegraf";

export const startCommandRes = (dotenvConfig: IDotenvConfig) => {
  return {
    message: dedent(`
  INZARE — это небольшой стартовый MVP в формате Telegram-бота.
  
	На данном этапе проводится техническая проверка системы:
	— интеграции рекламных блоков
	— стабильности сервиса
	— пользовательских сценариев
	
	Функциональность может меняться. Полный запуск — скоро.
	`),
    markup: Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          "INZARE",
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
