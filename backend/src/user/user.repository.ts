import { inject, injectable } from "inversify";
import type { IUserRepository } from "./interface/user.repository.interface.js";
import { TYPES } from "../types.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import { UserRole, type User } from "./model/user.model.js";
import { type ModelStatic, fn, literal } from "sequelize";
import type { IUser } from "./interface/user.service.interface.js";
import { Ticket } from "../ticket/model/ticket.model.js";
import { Ads } from "../ads/model/ads.model.js";

@injectable()
export class UserRepository implements IUserRepository {
  private _model: ModelStatic<User>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService
  ) {
    this._model = this.sequelize.postgres.modelManager.getModel(
      "User"
    ) as ModelStatic<User>;
  }
  public async create({
    telegramId,
    username,
    first_name,
  }: IUser): Promise<User> {
    return this._model.create({
      telegramId,
      username,
      first_name,
      role: UserRole.regular,
    });
  }
  public async findAll(): Promise<User[]> {
    return this._model.findAll();
  }

  public async getUsersAs(): Promise<User[]> {
    return this._model.findAll({
      attributes: {
        include: [
          [
            literal(
              `(SELECT COUNT(*) FROM "tickets" WHERE "tickets"."telegramId" = "User"."telegramId")`
            ),
            "ticketsCount",
          ],
          [
            literal(
              `(SELECT COUNT(*) FROM "ads" WHERE "ads"."telegramId" = "User"."telegramId")`
            ),
            "adsCount",
          ],
        ],
      },
    });
  }

  public async findProfile(telegramId: number): Promise<User | null> {
    return this._model.findOne({
      where: { telegramId },
      include: [
        { model: Ticket, as: "tickets" },
        { model: Ads, as: "ads" },
      ],
    });
  }

  public async update(telegramId: number, username?: string): Promise<number> {
  
    
    const [affectedCount] = await this._model.update(
      { username: username || null },
      { where: { telegramId } }
    );

    return affectedCount;
  }

  public async findOne(telegramId: number): Promise<User | null> {
    return this._model.findOne({ where: { telegramId } });
  }
}
