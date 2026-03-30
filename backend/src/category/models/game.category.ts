import type { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { GameModel } from "../../game/model/game.model.js";
import { Category } from "./category.model.js";

@Table({tableName: 'games_categories',  timestamps: false})
export class GameCategory extends Model<InferAttributes<GameCategory>, InferCreationAttributes<GameCategory>> {
	@ForeignKey(() => GameModel)
	@Column({ type: DataType.INTEGER, primaryKey: true })
	declare game_id: number;

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER, primaryKey: true })
	declare category_id: number;
}