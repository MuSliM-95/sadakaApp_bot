import type { RewardDto } from "../dto/reward.js";
import type { Ads } from "../model/ads.model.js";

export interface IData {
  usersCount: number;
  advertising: number;
}

export interface IGenerateToken {
  token: string;
  iv: string;
}

export type TicketsAdsRes = { adsCount: number };

export interface IAdsService {
  getAds(): Promise<Ads[]>;
  createAds(
    telegramId: number,
    body: RewardDto,
    userId: string
  ): Promise<{ ticket: string }>;
  getStats(): Promise<IData>;
  getAdsTicket(telegramId: number): Promise<TicketsAdsRes>;
  generateToken(userId: string): Promise<IGenerateToken>;
}
