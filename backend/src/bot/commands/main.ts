import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { Command } from "./command.class.js";
import { TYPES } from "../../types.js";
import { StartCommand } from "./start.comman.js";
import { AddCommands } from "./add.commands.class.js";
import { OnMessageCommand } from "./on.message.command.js";

export const botBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<Command>(TYPES.BotCommands).to(StartCommand);
    options.bind<Command>(TYPES.BotCommands).to(AddCommands);
    options.bind<Command>(TYPES.BotCommands).to(OnMessageCommand);
  }
);
