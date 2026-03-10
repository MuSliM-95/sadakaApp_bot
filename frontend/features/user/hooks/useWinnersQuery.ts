import { useQuery } from "@tanstack/react-query";
import { winnerService } from "../services/winner.service";


export function useWinnersQuery() {
  return useQuery({
    queryKey: ["get-winners"],
    queryFn: () => winnerService.getWinners(),
  });
}
