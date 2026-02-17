import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { IAdsController } from "./ads.controller.interface.js";
import { TYPES } from "../types.js";
import { AdsController } from "./ads.controller.js";
import { AdsService } from "./ads.service.js";

export const adsBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<IAdsController>(TYPES.AdsController).to(AdsController);
    options.bind<AdsService>(TYPES.AdsService).to(AdsService);
  }
);
