import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { IPointsController } from "./interfaces/points.controller.interface.js";
import { TYPES } from "../types.js";
import { PointsController } from "./points.controller.js";
import { PointsService } from "./points.service.js";
import type { IPointsService } from "./interfaces/points.service.interface.js";
import type { IPointsRepository } from "./interfaces/points.repository.interface.js";
import { PointsRepository } from "./points.repository.js";
import { Points } from "./model/point.js";

export const pointsBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<IPointsController>(TYPES.PointsController).to(PointsController);
	options.bind<typeof Points>(TYPES.Models).toConstantValue(Points);
	options.bind<IPointsService>(TYPES.PointsService).to(PointsService);
	options.bind<IPointsRepository>(TYPES.PointsRepository).to(PointsRepository);
})