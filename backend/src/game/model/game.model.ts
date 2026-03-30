import { type InferAttributes, type InferCreationAttributes, type CreationOptional, type NonAttribute } from "sequelize";
import { BelongsToMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Category } from "../../category/models/category.model.js";
import { GameCategory } from "../../category/models/game.category.js";


@Table({ tableName: 'games' })
export class GameModel extends Model<InferAttributes<GameModel>, InferCreationAttributes<GameModel>> {
  
	@Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
	declare id: CreationOptional<number>;

	@Column({type: DataType.TEXT, allowNull: false})
	declare title: string;

	@Column({type: DataType.TEXT, allowNull: false})
	declare url: string;

	@Column({type: DataType.TEXT, allowNull: false})
	declare description: string;

	@BelongsToMany(() => Category, () => GameCategory)
    declare categories?: NonAttribute<Category[]>

	@Column({type: DataType.TEXT, allowNull: false})
	declare img: string;

	@CreatedAt
	@Column({ type: DataType.DATE, field: 'created_at' })
	declare createdAt: CreationOptional<Date>

	@UpdatedAt
	@Column({ type: DataType.DATE, field: 'updated_at'})
	declare updatedAt: CreationOptional<Date>
}