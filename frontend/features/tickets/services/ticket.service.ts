import { api } from "@/shared/api/instance.api";
import { IParams, ITicket } from "../types/tickets,types";

class TicketService {
  public async getTickets() {
    const response = await api.get<{ ticketsCount: number }>(
      `api/tickets-count`
    );
    return response.ticketsCount;
  }

  public async getTicket(id: number) {
    const response = await api.get<ITicket>(`api/tickets/${id}`);
    console.log(response);

    return response;
  }

  public async createWinnerTicket(data: IParams) {
    const response = await api.post<{ message: string }>(`api/winning-tickets`, {
      ...data,
    });
    return response;
  }

  public async deleteWinnerTicket(id: number) {
    const response = await api.delete<{ message: string }>(`api/delete-winning-tickets/${id}`);
    return response;
  }
}

export const ticketService = new TicketService();
