import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { IAdsController } from "./interface/ads.controller.interface.js";
import { TYPES } from "../types.js";
import { AdsController } from "./ads.controller.js";
import { AdsService } from "./ads.service.js";
import { Ads } from "./model/ads.model.js";
import type { IAdsRepository } from "./interface/ads.repository.interface.js";
import { AdsRepository } from "./ads.repository.js";
import type { IAdsService } from "./interface/ads.service.interface.js";

export const adsBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<IAdsController>(TYPES.AdsController).to(AdsController);
    options.bind<IAdsService>(TYPES.AdsService).to(AdsService);
    options.bind<IAdsRepository>(TYPES.AdsRepository).to(AdsRepository);
    options.bind<typeof Ads>(TYPES.Models).toConstantValue(Ads)
  }
);
