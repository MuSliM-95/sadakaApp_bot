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
import type { IAdsController } from "./ads/ads.controller.interface.js";
import { AdsController } from "./ads/ads.controller.js";
import { ExceptionFilter } from "./errors/exception.filter.js";
import type { IExceptionFilter } from "./errors/exception.filter.interface.js";
import { adsBindings } from "./ads/main.js";

const appBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<ILoggerService>(TYPES.LoggerService).to(LoggerService);
    options.bind<App>(TYPES.Application).to(App);
    options
      .bind<IDotenvConfig>(TYPES.DotenvConfig)
      .to(DotenvConfig)
      .inSingletonScope();
    options.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  }
);

export interface IBootstrapReturn {
  app: App;
  container: Container;
}

async function bootstrap(): Promise<IBootstrapReturn> {
  const container = new Container();

  await container.load(appBindings, botBindings, adsBindings);

  const app = container.get<App>(TYPES.Application);

  await app.init();

  return {
    container,
    app,
  };
}

export const boot = bootstrap();
