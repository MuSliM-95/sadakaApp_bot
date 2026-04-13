import { useQuery } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";

export function usePointsQuery() {
  return useQuery({
    queryKey: ["get-points"],
    queryFn: () => pointsService.getPoints(),
    // enabled: enabled,
  });
}
