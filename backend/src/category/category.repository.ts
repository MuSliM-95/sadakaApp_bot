import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import type { ModelStatic } from "sequelize";

import type { ICategoryRepository } from "./interfaces/category.repository.interface.js";
import type { Category } from "./models/category.model.js";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private _model: ModelStatic<Category>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService
  ) {
    this._model = this.sequelize.postgres.modelManager.getModel(
      "GameModel"
    ) as ModelStatic<Category>;
  }

  public async findAll(): Promise<Category[]> {
    return this._model.findAll();
  }
}
