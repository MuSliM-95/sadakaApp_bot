import { useQuery } from "@tanstack/react-query";
import { adsService } from "../services/ads.service";

export function useTokenQuery() {
  return useQuery({
    queryKey: ["get-token"],
    queryFn: () => adsService.getToken(),
    enabled: false,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
}
