import { api } from "@/shared/api/instance.api";
import { IGenerateToken } from "../types/ads.types";
import { IPAdsHookParams } from "../hooks/useAdsMutation";

class AdsService {
  public async addAds(params: IPAdsHookParams) {
    const { type, data } = params;

    const response = await api.post<{ ticket: "no" | "created" }>(
      `api/reward`,
      {
        type,
        token: data.token,
        iv: data.iv,
      }
    );

    return response;
  }

  public async getAdsTicket() {
    const response = await api.get<{ adsCount: number }>(`api/ads/ticket`);
    return response.adsCount;
  }

  public async getToken() {
    const response = await api.get<IGenerateToken>("api/ads/generate-token");
    return response;
  }
}

export const adsService = new AdsService();
