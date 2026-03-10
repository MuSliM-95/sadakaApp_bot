import type {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
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
import { Ticket } from "../../ticket/model/ticket.model.js";

@Table({ tableName: "winners" })
export class Winner extends Model<
  InferAttributes<Winner>,
  InferCreationAttributes<Winner>
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: CreationOptional<number>;

  @ForeignKey(() => Ticket)
  @Column({ type: DataType.INTEGER, allowNull: false, unique: true })
  declare ticketId: number;

  @BelongsTo(() => Ticket)
  declare ticket?: NonAttribute<Ticket>;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  declare updatedAt: CreationOptional<Date>;
}
