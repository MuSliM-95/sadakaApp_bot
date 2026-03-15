import { dedent } from "ts-dedent";
import type { IDotenvConfig } from "../../../../configs/dotenv.interface.js";
import { Markup } from "telegraf";

export const startCommandRes = (dotenvConfig: IDotenvConfig) => {
  return {
    message: dedent(`
  CADAKA (Милостыня) — это небольшой стартовый MVP-проект для благотворительности, реализованный в формате Telegram-бота.
  
	На данном этапе проводится техническая проверка системы:
	— интеграции рекламных блоков
	— стабильности сервиса
	— пользовательских сценариев
	
	Функциональность может меняться. Полный запуск — скоро.
	`),
    markup: Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          "CADAKA",
          `${dotenvConfig.get("CLIENT_URL_NAME")}`
        ),
      ],
      [
        Markup.button.callback("Партнерские проекты", "affiliate_projects"),
        Markup.button.callback("⚙ Прочее", "other"),
      ],
    ]),
  };
};
