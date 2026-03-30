import { ContainerModule } from "inversify";
import { GameModel } from "./model/game.model.js";
import { TYPES } from "../types.js";
import { GameRepository } from "./game.repository.js";
import type { IGameRepository } from "./interfaces/game.repository.interface.js";
import type { IGameController } from "./interfaces/game.controller.interface.js";
import { GameController } from "./game.controller.js";
import type { IGameService } from "./interfaces/game.service.interface.js";
import { GameService } from "./game.service.js";



export const gameBindings = new ContainerModule((options) => {
  options.bind<IGameController>(TYPES.GameController).to(GameController)
  options.bind<IGameService>(TYPES.GameService).to(GameService)
  options.bind<IGameRepository>(TYPES.GameRepository).to(GameRepository)
  options.bind<typeof GameModel>(TYPES.Models).toConstantValue(GameModel)
})