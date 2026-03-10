import type { Transaction } from "sequelize";
import type { Ticket } from "../model/ticket.model.js";

export interface ITicketService {
  createTicket(telegramId: number, t: Transaction): Promise<Ticket>;
  getTickets(telegramId: number): Promise<Ticket[]>;
  getTicket(userId: number): Promise<Ticket>;
  getTicketsCount(telegramId: number): Promise<{ ticketsCount: number }>;
}
