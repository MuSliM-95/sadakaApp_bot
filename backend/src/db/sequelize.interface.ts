import { Sequelize, type ModelCtor } from 'sequelize-typescript';



// export const models = { User, Account, Token };
// export type Models = typeof models;

export interface ISequelizeService {
	postgres: Sequelize;
	// modelsAll: ModelCtor;

	connect: () => Promise<void>;

	disconnect: () => Promise<void>;
}
