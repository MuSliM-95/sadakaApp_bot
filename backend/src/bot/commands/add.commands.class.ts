import type { Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";
import { Command } from "./command.class.js";

export class AddCommands extends Command {
  handle(bot: Telegraf<IContextBot>): void {
    bot.telegram.setMyCommands([
      { command: "start", description: "старт" },
      { command: "help", description: "старт" },
    ]);
  }
}
