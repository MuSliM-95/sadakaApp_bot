import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "./interfaces/middleware.interface.js";
import { plainToClass, type ClassConstructor } from "class-transformer";
import { validate } from "class-validator";

type ValidationSource = "body" | "query" | "params";

export class ValidateMiddleware implements IMiddleware {
  constructor(
    private classValidate: ClassConstructor<object>,
    private sours: ValidationSource = "body"
  ) {}
  execute(req: Request, res: Response, next: NextFunction): void {
    const data = req[this.sours];

    const instance = plainToClass(this.classValidate, data, {
      enableImplicitConversion: true,
    });

    validate(instance).then((errors) => {
      if (errors.length > 0) {
        res.status(422).send(errors);
      } else {
        next();
      }
    });
  }
}
