import {
  Container,
  ContainerModule,
  type ContainerModuleLoadOptions,
} from "inversify";
import type { ILoggerService } from "./logger/logger.service.interface.js";
import { TYPES } from "./types.js";
import { LoggerService } from "./logger/logger.service.js";
import { App } from "./app.js";
import { DotenvConfig } from "./configs/dotenv.config.js";
import type { IDotenvConfig } from "./configs/dotenv.interface.js";
import { botBindings } from "./bot/commands/main.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import type { IExceptionFilter } from "./errors/exception.filter.interface.js";
import { adsBindings } from "./ads/main.js";
import type { ISequelizeService } from "./db/sequelize.interface.js";
import { SequelizeService } from "./db/sequelize.service.js";
import { userBindings } from "./user/main.js";
import { ticketBindings } from "./ticket/main.js";
import { SessionService } from "./common/session.service.js";
import type { ISessionService } from "./common/interfaces/session.service.interface.js";
import { RedisConfig } from "./configs/redis.config.js";
import { SessionConfig } from "./configs/session.config.js";
import { authBindings } from "./auth/main.js";
import { winnerBindings } from "./winner/main.js";

const appBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
    options.bind<App>(TYPES.Application).to(App);
    options
      .bind<IDotenvConfig>(TYPES.DotenvConfig)
      .to(DotenvConfig)
      .inSingletonScope();
    options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
    options
      .bind<ISequelizeService>(TYPES.SequelizeService)
      .to(SequelizeService);
    options.bind<ISessionService>(TYPES.SessionService).to(SessionService);
    options.bind<SessionConfig>(TYPES.SessionConfig).to(SessionConfig);
    options.bind<RedisConfig>(TYPES.RedisConfig).to(RedisConfig).inSingletonScope();
  }
);

export interface IBootstrapReturn {
  app: App;
  container: Container;
}

async function bootstrap(): Promise<IBootstrapReturn> {
  const container = new Container();

  await container.load(
    authBindings,
    appBindings,
    botBindings,
    adsBindings,
    ticketBindings,
    winnerBindings,
    userBindings
  );

  const app = container.get<App>(TYPES.Application);

  await app.init();

  return {
    container,
    app,
  };
}

export const boot = bootstrap();
