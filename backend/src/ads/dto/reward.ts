import { IsBase32, IsBase64, IsEnum, IsHexadecimal, IsNotEmpty, IsString } from "class-validator";
import type { Advertising } from "../../types/global.js";
import { AdvertisingEnum } from "../model/ads.model.js";

export class RewardDto {
  @IsEnum(AdvertisingEnum)
  @IsNotEmpty()
  type: Advertising;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsHexadecimal()
  iv: string;
}
