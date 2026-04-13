import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { IPointsService } from "./interfaces/points.service.interface.js";
import type { IPointsRepository } from "./interfaces/points.repository.interface.js";
import type { Points } from "./model/point.js";
import { HTTPError } from "../errors/http.error.class.js";

@injectable()
export class PointsService implements IPointsService {
  constructor(
    @inject(TYPES.PointsRepository)
    private readonly pointsRepository: IPointsRepository
  ) {}
  public async addPoints(userId: number, score: number): Promise<Points | null> {
    const results = await this.pointsRepository.addPoints(userId, score);


    return results[0] ?? null
  }

  public async getAllPoints(): Promise<Points[]> {
    return this.pointsRepository.findAll();
  }

  public async getPoints(userId: number): Promise<Points> {
    const points = await this.pointsRepository.findOne(userId);

    if (!points) {
      throw new HTTPError(404, "Ресурс не найден!");
    }

    return points;
  }
}
