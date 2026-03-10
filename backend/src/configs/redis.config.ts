import { inject, injectable } from 'inversify';
import { Redis } from 'ioredis';

import { TYPES } from '../types.js';
import type { IDotenvConfig } from './dotenv.interface.js';
import type { ILoggerService } from '../logger/logger.service.interface.js';

@injectable()
export class RedisConfig {
	private readonly _client: Redis;
	constructor(
		@inject(TYPES.DotenvConfig) private dotenvConfig: IDotenvConfig,
		@inject(TYPES.LoggerService) private logger: ILoggerService
		) {
		this._client = new Redis({
			host: this.dotenvConfig.get('REDIS_HOST'),
			port: Number(this.dotenvConfig.get('REDIS_PORT')),
			password: this.dotenvConfig.get('REDIS_PASSWORD'),

		});
		
		this._client.on('connect', () => {
			this.logger.log('[Redis] Connected');
		})

		this._client.on('error', (err) => {
			this.logger.error('[Redis] Error: ' + err.message);
		})
	}

	public get client(): Redis {
		return this._client;
	}

	public async redisClose(): Promise<void> {
		await this._client.quit();
	}
}
