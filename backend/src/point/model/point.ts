import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../user/model/user.model.js";

@Table({ tableName: "points" })
export class Points extends Model<
  InferAttributes<Points>,
  InferCreationAttributes<Points>
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare score: CreationOptional<number>;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare time: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User, { as: "user" })
  declare user?: NonAttribute<User>;
}
