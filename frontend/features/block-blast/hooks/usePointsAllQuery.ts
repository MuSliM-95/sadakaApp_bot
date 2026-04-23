import { useQuery } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";



interface IParams {
  enabled?: boolean;
}

export function usePointsAllQuery() {
  return useQuery({
    queryKey: ["get-points-all"],
    queryFn: () => pointsService.getPointsAll(),
    // enabled: enabled,
  });
}
