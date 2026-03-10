import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { IWinnerRepository } from "./interfaces/winner.repository.interface.js";
import { TYPES } from "../types.js";
import { WinnerRepository } from "./winner.repository.js";
import type { IWinnerController } from "./interfaces/winner.controller.interface.js";
import { WinnerController } from "./winner.controller.js";
import type { IWinnerService } from "./interfaces/winner.service.interface.js";
import { WinnerService } from "./winner.service.js";
import { Winner } from "./model/winner.model.js";

export const winnerBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<typeof Winner>(TYPES.Models).toConstantValue(Winner);
	options.bind<IWinnerController>(TYPES.WinnerController).to(WinnerController);
	options.bind<IWinnerService>(TYPES.WinnerService).to(WinnerService);
	options.bind<IWinnerRepository>(TYPES.WinnerRepository).to(WinnerRepository);
});
