import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adsService } from "../services/ads.service";
import { AdvertisingType } from "@/shared/types/global.types";
import { IGenerateToken } from "../types/ads.types";

export interface IPAdsHookParams {
  type: AdvertisingType;
  data: IGenerateToken;
}

export function useAdsMutation() {
  const queryClient = useQueryClient();
  const { mutate: addReward } = useMutation({
    mutationKey: ["add-ads-reward"],
    mutationFn: (params: IPAdsHookParams) =>
      adsService.addAds(params),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["get-ads-ticket"] });
      if (data.ticket === "created") {
        queryClient.invalidateQueries({ queryKey: ["get-tickets"] });
      }
    },
    onError(error) {
      console.error("Ads mutation error:", error);
    },
  });

  return { addReward };
}
