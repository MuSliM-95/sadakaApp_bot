import { config, type DotenvParseOutput } from "dotenv";
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";
import type { IDotenvConfig } from "./dotenv.interface.js";

@injectable()
export class DotenvConfig implements IDotenvConfig {
  private _data: DotenvParseOutput = {};

  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService
  ) {
    const result = config();
    if (result.error) {
      this.loggerService.error(
        "[DotenvConfig] Не удалось прочитать файл .env или он отсутствует"
      );
    } else {
      this._data = result.parsed!;
      this.loggerService.log("[DotenvConfig] Конфигурация .env загружена");
    }
  }

  public get(key: string): string {
    return this._data[key] || process.env[key] || "";
  }
}
