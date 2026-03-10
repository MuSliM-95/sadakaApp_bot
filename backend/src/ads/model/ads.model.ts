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
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "../../user/model/user.model.js";
import type { Advertising } from "../../types/global.js";

export enum AdvertisingEnum {
  INIT = "init",
  REWARD = "reward",
}

@Table({ tableName: "ads" })
export class Ads extends Model<
  InferAttributes<Ads>,
  InferCreationAttributes<Ads>
> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  declare ticket: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(AdvertisingEnum)),
    allowNull: false,
  })
  declare type: Advertising;

  @ForeignKey(() => User)
  @Column({ type: DataType.BIGINT, allowNull: false })
  declare telegramId: number;

  @BelongsTo(() => User, { foreignKey: "telegramId", targetKey: "telegramId" })
  declare user?: NonAttribute<User>;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: CreationOptional<Date>;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare createdAt: CreationOptional<Date>;
}
