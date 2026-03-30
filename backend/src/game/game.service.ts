import { inject, injectable } from "inversify";
import type { GameDto } from "./dto/game.dto.js";
import type { IGameService } from "./interfaces/game.service.interface.js";
import { TYPES } from "../types.js";
import type { IGameRepository } from "./interfaces/game.repository.interface.js";
import { HTTPError } from "../errors/http.error.class.js";
import type { GameModel } from "./model/game.model.js";

@injectable()
export class GameService implements IGameService {
  constructor(
    @inject(TYPES.GameRepository)
    private readonly gameRepository: IGameRepository
  ) {}
  public async addGame(body: GameDto): Promise<{ message: string }> {
    const exists = await this.gameRepository.findOne(body.url);

    if (exists) {
      throw new HTTPError(409, "Игра уже добавлена");
    }

    await this.gameRepository.create(body);

    return { message: "Игра добавлена" };
  }

  public async getGames(): Promise<GameModel[]> {
    return this.gameRepository.findAll();
  }
}
