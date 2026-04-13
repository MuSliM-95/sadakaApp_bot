import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";


export function usePointsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-points"],
    mutationFn: (points: number) => pointsService.addPoints(points),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["get-points-all"]})
    }
  });
}
