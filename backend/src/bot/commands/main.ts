import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { Command } from "./command.class.js";
import { TYPES } from "../../types.js";
import { StartCommand } from "./start.comman.js";
import { AddCommands } from "./add.commands.class.js";
import { OnMessageCommand } from "./on.message.command.js";
import { ActionCallback } from "./actions.callback.js";
import { PaymentOn } from "./bot.on.payment.js";

export const botBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<Command>(TYPES.BotCommands).to(StartCommand);
    options.bind<Command>(TYPES.BotCommands).to(AddCommands);
    options.bind<Command>(TYPES.BotCommands).to(OnMessageCommand);
    options.bind<Command>(TYPES.BotCommands).to(ActionCallback);
    options.bind<Command>(TYPES.BotCommands).to(PaymentOn);
  }
);
