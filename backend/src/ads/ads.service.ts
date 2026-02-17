import { inject, injectable } from "inversify";
import fs from "node:fs/promises";
import path from "path";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";

interface IData {
  users: unknown[];
  usersCount: number;
  advertising: number;
}

@injectable()
export class AdsService {
  filePatch: string;
  private writeLock: Promise<void>;

  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService
  ) {
    this.filePatch = path.join(process.cwd(), "stats.json");
    this.writeLock = Promise.resolve();
  }

  async createUser(userId: number) {
    this.writeLock = this.writeLock.then(async () => {
      const data = await this.getStats();

      const dataSet = new Set(data?.users || []);
      dataSet.add(userId);

      const stats: IData = {
        users: Array.from(dataSet),
        usersCount: dataSet.size,
        advertising: data.advertising,
      };

      await fs.writeFile(this.filePatch, JSON.stringify(stats, null, 2));
    });

    return this.writeLock;
  }

  async getStats() {
    try {
      const data = await fs.readFile(this.filePatch, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      this.loggerService.error(`[adsService.getStats] ${error}`);
      return {
        users: [],
        usersCount: 0,
        advertising: 0,
      };
    }
  }

  async updateState() {
    this.writeLock = this.writeLock.then(async () => {
      const data = await this.getStats();

      const stats: IData = {
        users: data.users,
        usersCount: data.usersCount,
        advertising: data.advertising ? data.advertising + 1 : 1,
      };

      await fs.writeFile(this.filePatch, JSON.stringify(stats, null, 2));
    });
    return this.writeLock;
  }
}
