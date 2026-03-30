import type { GameDto } from "../dto/game.dto.js";
import type { GameModel } from "../model/game.model.js";

export interface IGameRepository {
  create(body: GameDto): Promise<GameModel>;
  findOne(url: string): Promise<GameModel | null>;
  findAll(): Promise<GameModel[]>;
}
