import { Router } from "express";
import type { IControllerRoute } from "./route.interface.js";
import type { ILoggerService } from "../logger/logger.service.interface.js";

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private readonly logger: ILoggerService) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const middlewares = route.middlewares?.map((mid) =>
        mid.execute.bind(mid)
      );
      const handler = route.func.bind(this);
      const pipeline = middlewares ? [...middlewares, handler] : handler;
      this._router[route.method](route.path, pipeline);
    }
  }
}
