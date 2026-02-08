import type { NextFunction, Request, Response } from 'express';

import { inject, injectable } from 'inversify';
import { TYPES } from '../types.js';
import type { IExceptionFilter } from './exception.filter.interface.js';
import type { ILoggerService } from '../logger/logger.service.interface.js';
import { HTTPError } from './http.error.class.js';


@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.LoggerService) private logger: ILoggerService) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} ${err.message}`);
			res.status(err.statusCode).json({ err: err.message });
		} else if (err) {
			this.logger.error(`${err.message}`);
			res.status(500).json({ err: err.message });
		}
	}
}
