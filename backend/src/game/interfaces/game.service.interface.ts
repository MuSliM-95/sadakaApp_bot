import type { GameDto } from "../dto/game.dto.js";
import type { GameModel } from "../model/game.model.js";

export interface IGameService {
  addGame(body: GameDto): Promise<{ message: string }>;
  getGames(): Promise<GameModel[]>;
}
