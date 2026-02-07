import { Logger, type ILogObj } from "tslog";
import type { ILoggerService } from "./logger.service.interface.js";

export class LoggerService implements ILoggerService {
  private _logger: Logger<ILogObj>;

  constructor() {
    const loggerTemplate =
      "{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}: ";
    this._logger = new Logger({ prettyLogTemplate: loggerTemplate });
  }

  log(...args: unknown[]): void {
    this._logger.info(...args);
  }

  warn(...args: unknown[]): void {
    this._logger.warn(...args);
  }

  error(...args: unknown[]): void {
    this._logger.error(...args);
  }
}
