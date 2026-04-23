import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { IPointsRepository } from "./interfaces/points.repository.interface.js";
import { Points } from "./model/point.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import { Op, type ModelStatic, QueryTypes } from "sequelize";
import type { RedisConfig } from "../configs/redis.config.js";

@injectable()
export class PointsRepository implements IPointsRepository {
  private _model: ModelStatic<Points>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService,
    @inject(TYPES.RedisConfig) private readonly redis: RedisConfig
  ) {
    this._model = this.sequelize.postgres.modelManager.getModel(
      "Points"
    ) as ModelStatic<Points>;
  }
  public async create(score: number, userId: number): Promise<Points> {
    return this._model.create({ score, userId });
  }

  public async findAll(): Promise<Points[]> {
    return this._model.findAll({
      include: [{ association: "user" }],
    });
  }

  public async addPoints(userId: number, score: number): Promise<Points[]> {
    const results = await this._model.sequelize!.query(
      `INSERT INTO points ("userId", score, "createdAt", "updatedAt")
    VALUES (:userId, :score, NOW(), NOW())
    ON CONFLICT ("userId")
    DO UPDATE SET score = EXCLUDED.score, "updatedAt" = NOW() WHERE
    points.score < EXCLUDED.score 
    RETURNING *`,
      {
        replacements: { userId, score },
        model: this._model,
        mapToModel: true,
        type: QueryTypes.SELECT,
      }
    );

    return results;
  }

  public async findOne(userId: number): Promise<Points | null> {
    return this._model.findOne({ where: { userId } });
  }
  public async findByPk(pointsId: number): Promise<Points | null> {
    return this._model.findByPk(pointsId);
  }

  public async saveGameSession(sessionId: string, sessionData: string): Promise<string> {    
    return this.redis.client.set(sessionId, sessionData);
  }
  public async findGameSession(sessionId: string): Promise<string | null> {    
    return this.redis.client.get(sessionId);
  }
}
