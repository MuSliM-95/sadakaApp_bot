import { inject, injectable, multiInject } from "inversify";

import { Sequelize, type ModelCtor } from "sequelize-typescript";

import { TYPES } from "../types.js";
import type { IDotenvConfig } from "../configs/dotenv.interface.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { ISequelizeService } from "./sequelize.interface.js";

@injectable()
export class SequelizeService implements ISequelizeService {
  postgres: Sequelize;
  // modelsAll: ModelCtor;

  constructor(
    @inject(TYPES.DotenvConfig) private dotenvConfig: IDotenvConfig,
    @inject(TYPES.LoggerService) private logger: ILoggerService,
    @multiInject(TYPES.Models) private models: ModelCtor[]
  ) {
    this.postgres = new Sequelize(
      this.dotenvConfig.get("POSTGRES_DB"),
      this.dotenvConfig.get("POSTGRES_USER"),
      this.dotenvConfig.get("POSTGRES_PASSWORD"),
      {
        dialect: "postgres",
        port: Number(this.dotenvConfig.get("POSTGRES_PORT")),
        host: this.dotenvConfig.get("POSTGRES_HOST"),
        models: this.models,
        logging: false,
      }
    );
  }

  public async connect(): Promise<void> {
    try {
      await this.postgres.authenticate();
      await this.postgres.sync({ force: false });
      this.logger.log("[SequelizeService]. Успешно подключились к базе данных");
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          "[SequelizeService]. Ошибка при подключение к базе данных " + error
        );
      }
    }
  }

  public async force(): Promise<void> {
    await this.postgres.sync({ force: true });
  }

  public async disconnect(): Promise<void> {
    await this.postgres.close();
  }
}
