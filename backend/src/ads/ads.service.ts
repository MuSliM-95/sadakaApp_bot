import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { IUserService } from "../user/interface/user.service.interface.js";
import type {
  IAdsService,
  IData,
  IGenerateToken,
  TicketsAdsRes,
} from "./interface/ads.service.interface.js";
import type { IAdsRepository } from "./interface/ads.repository.interface.js";
import type { ITicketService } from "../ticket/interface/ticket.service.interface.js";
import type { Ads } from "./model/ads.model.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import { HTTPError } from "../errors/http.error.class.js";
import crypto from "crypto";
import type { RewardDto } from "./dto/reward.js";
import type { IDotenvConfig } from "../configs/dotenv.interface.js";

@injectable()
export class AdsService implements IAdsService {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.DotenvConfig) private readonly dotenvConfig: IDotenvConfig,
    @inject(TYPES.AdsRepository) private readonly adsRepository: IAdsRepository,
    @inject(TYPES.UserService) private readonly userService: IUserService,
    @inject(TYPES.TicketService) private readonly ticketService: ITicketService,
    @inject(TYPES.SequelizeService)
    private readonly sequelizeService: ISequelizeService
  ) {}

  public async createAds(
    telegramId: number,
    body: RewardDto,
    userId: string
  ): Promise<{ ticket: string }> {
    const t = await this.sequelizeService.postgres.transaction();
    try {
    
      const { type, token, iv } = body;
      const redisKey = `reward:${userId}`;

      const isExists = await this.adsRepository.getRedisToken(redisKey);
      
      
      if (!isExists) {
        throw new HTTPError(422, "Ошибка при просмотра рекламы.");
      }

      const secretKey = this.dotenvConfig.get("REWARD_SECRET").slice(0, 32);
      
      const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(secretKey),
        Buffer.from(iv, "hex")
        );
        
        
        let decrypted = decipher.update(token, "hex", "utf8");
      decrypted += decipher.final("utf8");
      
      
      if (Number(decrypted) < Date.now()) {
        throw new HTTPError(422, "Токен не валиден");
      }
   
     
      await this.adsRepository.create(telegramId, type, t);
      const adsAll = await this.adsRepository.getTicketAdsLimitForUpdate(
        telegramId,
        5,
        t
        );
        
        let ticket = "no";
        if (adsAll.length === 5) {
          await this.ticketService.createTicket(telegramId, t);
        const ids = adsAll.map((el) => el.id);
        await this.adsRepository.updateAds(ids, t);
        ticket = "created";
      }

      await t.commit();
      return { ticket };
    } catch (error) {
      await t.rollback();
      this.loggerService.error(error);
      console.log(error);
      
      throw new HTTPError(500, "Непредвиденная ошибка");
    }
  }

  public async getAds(): Promise<Ads[]> {
    return this.adsRepository.findAll();
  }

  public async getAdsTicket(telegramId: number): Promise<TicketsAdsRes> {
    const ads = await this.adsRepository.getTicketAdsCount(telegramId);
    return { adsCount: ads };
  }

  public async generateToken(userId: string): Promise<IGenerateToken> {
    const isExists = await this.adsRepository.getRedisToken(userId);

    if (isExists) {
      throw new HTTPError(422, "Алик, отводи ребят");
    }

    const payload = `${Date.now() + 60 * 1000}`;
    const secretKey = this.dotenvConfig.get("REWARD_SECRET").slice(0, 32);

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secretKey), iv);

    let token = cipher.update(payload, "utf-8", "hex");
    token += cipher.final("hex");

    const redisKey = `reward:${userId}`;
    await this.adsRepository.createRedisToken(redisKey, token);

    return {
      token,
      iv: iv.toString("hex"),
    };
  }

  public async getStats(): Promise<IData> {
    try {
      const user = await this.userService.getUsers();
      const ads = await this.adsRepository.findAll();

      return {
        usersCount: user.length,
        advertising: ads.length,
      };
    } catch (error) {
      this.loggerService.error(`[adsService.getStats] ${error}`);
      return {
        usersCount: 0,
        advertising: 0,
      };
    }
  }
}
