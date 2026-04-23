import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";
import { SubmitGameRequest } from "../types/points.types";


export function usePointsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-points"],
    mutationFn: (data: SubmitGameRequest) => pointsService.gameFinish(data),
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["get-points-all"]})
    }
  });
}
