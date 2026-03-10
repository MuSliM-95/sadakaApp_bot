import type { Transaction } from "sequelize";
import type { Ticket } from "../model/ticket.model.js";

export interface ITicketRepository {
  findAll(telegramId: number): Promise<Ticket[]>;
  findOne(id: number): Promise<Ticket | null>;
  findTicketsAll(): Promise<Ticket[]>;
  findAllCount(telegramId: number): Promise<number>;
  create(telegramId: number, t: Transaction): Promise<Ticket>;
}
