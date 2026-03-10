import { inject, injectable } from 'inversify';
import { RedisStore } from 'connect-redis';
import type { RedisConfig } from './redis.config.js';
import { TYPES } from '../types.js';
import type { ILoggerService } from '../logger/logger.service.interface.js';
import { ms, type StringValue } from '../utils/ms-util.js';
import type { IDotenvConfig } from './dotenv.interface.js';
import { parseBoolean } from '../utils/parse-boolean.util.js';
import type { CookieOptions } from 'express-session';

@injectable()
export class SessionConfig {
	secret: string;
	name: string;
	resave: boolean;
	saveUninitialized: boolean;
	cookie: CookieOptions;
	store: RedisStore;

	constructor(
		@inject(TYPES.DotenvConfig) private dotenvConfig: IDotenvConfig,
		@inject(TYPES.RedisConfig) private redisConfig: RedisConfig,
		@inject(TYPES.LoggerService) private loggerService: ILoggerService,
	) {
		this.secret = this.dotenvConfig.get('SESSION_SECRET');
		this.name = this.dotenvConfig.get('SESSION_NAME');
		this.resave = false;
		this.saveUninitialized = false;
		this.cookie = {
			domain: this.dotenvConfig.get('SESSION_DOMAIN'),
			maxAge: ms(this.dotenvConfig.get('SESSION_MAX_AGE') as StringValue),
			httpOnly: parseBoolean(this.dotenvConfig.get('SESSION_HTTP_ONLY')),
			secure: parseBoolean(this.dotenvConfig.get('SESSION_SECURE')),
			sameSite: 'none' as const,
		};
		this.store = new RedisStore({
			client: this.redisConfig.client,
			prefix: this.dotenvConfig.get('SESSION_FOLDER'),
			// disableTTL: true
		});
	}
}
