import { api } from "@/shared/api/instance.api";
import { Game, IGameAdd } from "../types/types";

class GameService {
  async addGame(body: IGameAdd) {    
    const response = await api.post<{ message: string }>("api/games/add", {
      ...body,
    });

    return response;
  }

  async getGames() {
    const response = await api.get<Game[]>('api/games')

    return response
  }
}

export const gameService = new GameService();
