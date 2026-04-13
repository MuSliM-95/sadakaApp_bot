import { api } from "@/shared/api/instance.api";
import { IPoints } from "../types/points.types";

class PointsService {
  public async getPointsAll() {
    const response = await api.get<IPoints[]>("api/points/all");
    console.log(response);
    return response;
  }
  public async getPoints() {
    const response = await api.get<IPoints>("api/points");
    return response;
  }
  public async addPoints(score: number) {
    
    const response = await api.post<IPoints | undefined>("api/points/create", {
      score,
    });
    console.log("response", response);
  
    
    return response;
  }
}

export const pointsService = new PointsService();
