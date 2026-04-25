import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type {
  GameSessionType,
  IPointsService,
  Move,
} from "./interfaces/points.service.interface.js";
import type { IPointsRepository } from "./interfaces/points.repository.interface.js";
import type { Points } from "./model/point.js";
import { HTTPError } from "../errors/http.error.class.js";
import crypto from "crypto";
import { GameEngine } from "./gameEngine.js";

@injectable()
export class PointsService implements IPointsService {
  constructor(
    @inject(TYPES.PointsRepository)
    private readonly pointsRepository: IPointsRepository
  ) {}
  public async gameFinish(
    sessionId: string,
    userId: number,
    moves: Move[],
    clientScore: number
  ): Promise<Points | null> {
    const data = await this.pointsRepository.findGameSession(`game:${userId}`);
    if (!data) {
      throw new HTTPError(400, "No active game");
    }

    const session = JSON.parse(data);

    if (session.sessionId !== sessionId) {
      throw new HTTPError(400, "Session outdated");
    }

    const gameEngine = new GameEngine();

    if (!moves || moves.length > 300) {
      throw new HTTPError(400, "Too many moves");
    }

    const result = gameEngine.simulateGame(session.seed, moves);

    if (result.score !== clientScore) {
      throw new HTTPError(400, "Score mismatch");
    }

    const time = Date.now() - session.startedAt
    
    const results = await this.pointsRepository.addPoints(userId, result.score, time);

    // console.log(results);
    
    return results[0] ?? null;
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

  public async gameSession(userId: number): Promise<GameSessionType> {
    const sessionId = crypto.randomUUID();
    const seed = crypto.randomInt(1, 1_000_000_000);
    await this.pointsRepository.saveGameSession(
      `game:${userId}`,
      JSON.stringify({
        sessionId,
        seed,
        startedAt: Date.now(),
      })
    );

    return {
      sessionId,
      seed,
    };
  }
}
