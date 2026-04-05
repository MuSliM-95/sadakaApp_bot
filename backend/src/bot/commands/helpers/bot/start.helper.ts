import { dedent } from "ts-dedent";
import type { IDotenvConfig } from "../../../../configs/dotenv.interface.js";
import { Markup } from "telegraf";

export const startCommandRes = (dotenvConfig: IDotenvConfig) => {
  return {
    message: dedent(`
WayGames — игровая платформа 🎮
Хочешь отвлечься и переключиться?

Здесь тебя ждут игры, которые затягивают:
логика, реакция и немного хитрости

Просто выбери игру и попробуй сам

👇 Играть
	
	`),
    markup: Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          "WayGames",
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
