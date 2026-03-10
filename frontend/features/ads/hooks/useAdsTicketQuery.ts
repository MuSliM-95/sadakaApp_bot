import { useQuery } from "@tanstack/react-query";
import { adsService } from "../services/ads.service";

export function useAdsTicketQuery() {
  return useQuery({
    queryKey: ["get-ads-ticket"],
    queryFn: () => adsService.getAdsTicket(),
  });
}
