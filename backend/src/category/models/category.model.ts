import { type InferAttributes, type InferCreationAttributes, type CreationOptional, type NonAttribute } from "sequelize";
import { BelongsToMany, Column, CreatedAt, DataType, Model, Table, UpdatedAt } from "sequelize-typescript";
import { GameModel } from "../../game/model/game.model.js";
import { GameCategory } from "./game.category.js";


@Table({ tableName: 'categories' })
export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
	@Column({type: DataType.INTEGER, primaryKey: true, autoIncrement: true})
	declare id: CreationOptional<number>;

	@Column({type: DataType.TEXT, allowNull: false})
	declare name: string;

	@BelongsToMany(() => GameModel, () => GameCategory)
	declare games?: NonAttribute<GameModel[]>;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	declare slug: string;
    
	@CreatedAt
	@Column({ type: DataType.DATE, field: 'created_at' })
	declare createdAt: CreationOptional<Date>

	@UpdatedAt
	@Column({ type: DataType.DATE, field: 'updated_at'})
	declare updatedAt: CreationOptional<Date>
}