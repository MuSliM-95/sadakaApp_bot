import { useQuery } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";

export function usePointsQuery(userId?: number) {
  return useQuery({
    queryKey: ["points", userId],
    queryFn: () => pointsService.getPoints(),
    enabled: !!userId,
  });
}
