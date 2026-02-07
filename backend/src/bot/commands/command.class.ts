import type { Telegraf } from "telegraf";
import type { IContextBot } from "../context/bot.context.interface.js";

export abstract class Command  {
	abstract handle(bot: Telegraf<IContextBot>): void
}