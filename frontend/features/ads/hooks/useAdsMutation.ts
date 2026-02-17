
import { useMutation } from "@tanstack/react-query";
import { adsService } from "../services/ads.service";

export function useAdsMutation() {
  const { mutate: getApi } = useMutation({
    mutationKey: ["get-ads"],
    mutationFn: () => adsService.getApi(),
    onSuccess() {},
    onError() {},
  });

  return { getApi };
}
