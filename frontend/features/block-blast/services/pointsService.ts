import { api } from "@/shared/api/instance.api";
import { GameSessionType, IPoints, SubmitGameRequest } from "../types/points.types";

class PointsService {
  public async getPointsAll() {
    const response = await api.get<IPoints[]>("api/game/points/all");
    return response;
  }
  public async getPoints() {
    const response = await api.get<IPoints>("api/game/points");
    return response;
  }

  public async gameFinish(data: SubmitGameRequest) {
    const response = await api.post<IPoints | undefined>(
      "api/game/finish",
      {
        ...data,
      }
    );

    return response;
  }

  public async gameSession() {
    const response = await api.post<GameSessionType>("api/game/start");   
    return response;
  }
}

export const pointsService = new PointsService();
