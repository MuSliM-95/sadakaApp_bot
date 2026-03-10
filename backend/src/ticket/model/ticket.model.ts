import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "../../user/model/user.model.js";
import { Winner } from "../../winner/model/winner.model.js";

@Table({ tableName: "tickets" })
export class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare used: boolean;
  
  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare telegramId: number;
  
  @BelongsTo(() => User, { foreignKey: "telegramId", targetKey: "telegramId" })
  declare user?: NonAttribute<User>;

  @HasOne(() => Winner)
  declare winner?: NonAttribute<Winner>

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: CreationOptional<Date>;
}
