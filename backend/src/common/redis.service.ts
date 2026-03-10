import { inject, injectable } from "inversify";
import type { Redis } from "ioredis";
import { TYPES } from "../types.js";
import type { IRedisService } from "./interfaces/redis.service.interface.js";

@injectable()
export class RedisService implements IRedisService {
  private redis: Redis;

  constructor(
    @inject(TYPES.RedisConfig) private readonly redisService: IRedisService
  ) {}
}
