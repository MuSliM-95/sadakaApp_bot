import type { Transaction } from "sequelize";
import type { Ads } from "../model/ads.model.js";
import type { Advertising, TransactionCustom } from "../../types/global.js";

export interface IAdsRepository {
  findAll(): Promise<Ads[]>;
  getTicketAdsLimitForUpdate(
    telegramId: number,
    limit: number,
    t: TransactionCustom
  ): Promise<Ads[]>;
  getTicketAdsCount(telegramId: number): Promise<number>;
  create(telegramId: number, type: Advertising, t: Transaction): Promise<Ads>;
  createRedisToken(redisKey: string, token: string): Promise<string>;
  getRedisToken(userId: string): Promise<string | null>;
  updateAds(ids: number[], t: Transaction): Promise<void>;
  getDelRedisToken(userId: string): Promise<string | null>
}
