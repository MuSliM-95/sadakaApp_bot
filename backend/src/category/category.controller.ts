import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller.js";

import { TYPES } from "../types.js";
import type { Request, Response, NextFunction } from "express";
import type { ILoggerService } from "../logger/logger.service.interface.js";

import { AuthGuard } from "../common/guard/auth.guard.js";

import type { ICategoryController } from "./interfaces/category.controller.interface.js";
import type { ICategoryService } from "./interfaces/category.service.interface.js";

@injectable()
export class CategoryController extends BaseController implements ICategoryController {
  constructor(
    @inject(TYPES.LoggerService) private readonly loggerService: ILoggerService,
    @inject(TYPES.CategoryService) private readonly categoryService: ICategoryService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        method: "get",
        path: "/categories",
        middlewares: [new AuthGuard()],
        func: this.getCategories,
      }
    ]);
  }

  public async getCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = await this.categoryService.getCategories();
  
    res.json(data);
  }
}
