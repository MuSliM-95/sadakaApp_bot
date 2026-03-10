import { inject, injectable } from "inversify";
import type { IAdsRepository } from "./interface/ads.repository.interface.js";
import { TYPES } from "../types.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import type { ModelStatic, Transaction } from "sequelize";
import type { Advertising } from "../types/global.js";
import { AdvertisingEnum, type Ads } from "./model/ads.model.js";
import type { RedisConfig } from "../configs/redis.config.js";

@injectable()
export class AdsRepository implements IAdsRepository {
  private _model: ModelStatic<Ads>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService,
    @inject(TYPES.RedisConfig) private readonly redis: RedisConfig
  ) {
    this._model = this.sequelize.postgres.modelManager.getModel(
      "Ads"
    ) as ModelStatic<Ads>;
  }

  public async findAll(): Promise<Ads[]> {
    return this._model.findAll();
  }

  public async getTicketAdsLimitForUpdate(
    telegramId: number,
    limit: number,
    t: Transaction
  ): Promise<Ads[]> {
    return this._model.findAll({
      where: { telegramId, ticket: false, type: AdvertisingEnum.REWARD },
      limit,
      attributes: ["id"],
      order: [["id", "ASC"]],
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
  }

  public async getTicketAdsCount(telegramId: number): Promise<number> {
    return this._model.count({
      where: { telegramId, ticket: false, type: AdvertisingEnum.REWARD },
    });
  }

  public async getRedisToken(userId: string): Promise<string | null> {
    return this.redis.client.get(userId)
  }

  public async createRedisToken(
    redisKey: string,
    token :string
  ): Promise<string> {
    return this.redis.client.set(redisKey, token, "EX", 60);
  }

  public async create(
    telegramId: number,
    type: Advertising,
    t: Transaction
  ): Promise<Ads> {
    return this._model.create(
      {
        telegramId,
        ticket: false,
        type,
      },
      { transaction: t }
    );
  }

  public async updateAds(ids: number[], t: Transaction): Promise<void> {
    await this._model.update(
      { ticket: true },
      {
        where: {
          id: ids,
        },
        transaction: t,
      }
    );
  }
}
