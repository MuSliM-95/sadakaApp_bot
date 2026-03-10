import { api } from "@/shared/api/instance.api";
import { IWinner } from "@/features/tickets/types/tickets,types";

class WinnerService {
  public async getWinners() {
    const response = await api.get<IWinner[]>(`api/winners`);
	console.log(response);
	
    return response;
  }
}

export const winnerService = new WinnerService();
