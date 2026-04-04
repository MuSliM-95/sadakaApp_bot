import { inject, injectable } from "inversify";
import type { GameDto } from "./dto/game.dto.js";
import type { IGameRepository } from "./interfaces/game.repository.interface.js";
import { TYPES } from "../types.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import type { ModelStatic } from "sequelize";
import type { GameModel } from "./model/game.model.js";
import { Category } from "../category/models/category.model.js";

@injectable()
export class GameRepository implements IGameRepository {
  private _model: ModelStatic<GameModel>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService
  ) {
    this._model = this.sequelize.postgres.modelManager.getModel(
      "GameModel"
    ) as ModelStatic<GameModel>;
  }

  public async create(body: GameDto): Promise<GameModel> {
    console.log(body);
    
    const {categories, ...rest} = body
    const game = await this._model.create(rest);

    await game.setCategories(categories)
    
    return game
  }

  public async findOne(url: string): Promise<GameModel | null> {
    return this._model.findOne({ where: { url } });
  }

  public async findAll(): Promise<GameModel[]> {
    return this._model.findAll({include: [Category]});
  }
}
