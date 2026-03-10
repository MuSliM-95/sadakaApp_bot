import { inject, injectable } from "inversify";
import type { ITicketService } from "./interface/ticket.service.interface.js";
import type { Ticket } from "./model/ticket.model.js";
import { TYPES } from "../types.js";
import type { ITicketRepository } from "./interface/ticket.repository.interface.js";
import type { Transaction } from "sequelize";
import type { IUserService } from "../user/interface/user.service.interface.js";
import { UserRole } from "../user/model/user.model.js";
import { HTTPError } from "../errors/http.error.class.js";

@injectable()
export class TicketService implements ITicketService {
  constructor(
    @inject(TYPES.TicketRepository)
    private readonly ticketRepository: ITicketRepository,
    @inject(TYPES.UserService) private readonly userService: IUserService
  ) {}

  public async createTicket(
    telegramId: number,
    t: Transaction
  ): Promise<Ticket> {
    return this.ticketRepository.create(telegramId, t);
  }

  public async getTicketsCount(
    telegramId: number
  ): Promise<{ ticketsCount: number }> {
    const tickets = await this.ticketRepository.findAllCount(telegramId);

    return {
      ticketsCount: tickets,
    };
  }

  public async getTicket(userId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne(userId);

    if (!ticket) {
      throw new HTTPError(404, "Тикет не найден!");
    }

    return ticket;
  }

  public async getTickets(telegramId: number): Promise<Ticket[]> {
    const user = await this.userService.getUser(telegramId);
    if (user?.role === UserRole.admin) {
      const tickets = await this.ticketRepository.findTicketsAll();
      return tickets;
    }

    return this.ticketRepository.findAll(telegramId);
  }
}
