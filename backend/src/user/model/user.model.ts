import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Ticket } from "../../ticket/model/ticket.model.js";
import { Ads } from "../../ads/model/ads.model.js";
// import { Winner } from "../../winner/model/winner.model.js";

export enum UserRole {
  regular = "REGULAR",
  admin = "ADMIN",
}

@Table({ tableName: "users" })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: CreationOptional<number>;

  @Column({ type: DataType.STRING, allowNull: true })
  declare first_name: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare username: string | null;

  @Column({ type: DataType.BIGINT, allowNull: false, unique: true })
  declare telegramId: number;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    defaultValue: UserRole.regular,
    allowNull: false,
  })
  declare role: UserRole;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: CreationOptional<Date>;

  @HasMany(() => Ticket, {
    as: "tickets",
    foreignKey: "telegramId",
    sourceKey: "telegramId",
  })
  declare tickets?: NonAttribute<Ticket[]>;


  @HasMany(() => Ads, {
    as: "ads",
    foreignKey: "telegramId",
    sourceKey: "telegramId",
  })
  declare ads?: NonAttribute<Ads[]>;
}
