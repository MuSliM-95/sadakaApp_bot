import type { Transaction } from "sequelize";
import { AdvertisingEnum } from "../ads/model/ads.model.js";

export type TransactionCustom = Transaction | null;

export type Advertising =
  (typeof AdvertisingEnum)[keyof typeof AdvertisingEnum];

export interface IMessage {
  message: string;
}
