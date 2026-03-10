import type { Transaction } from "sequelize";
import { AdvertisingEnum } from "../ads/model/ads.model.js";

export type TransactionCustom = Transaction | null;

export type Advertising =
  (typeof AdvertisingEnum)[keyof typeof AdvertisingEnum];

export interface IMessage {
  message: string;
}

export interface ITelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}
