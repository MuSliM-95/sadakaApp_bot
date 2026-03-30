import { useQuery } from "@tanstack/react-query";
import { gameService } from "../services/game.service";


interface IParams {
  selectedTicket: number | null;
  enabled: boolean;
}

export function useGamesQuery({ selectedTicket, enabled }: IParams) {
  return useQuery({
    queryKey: ["get-ticket", selectedTicket],
    queryFn: () => gameService.getGames(),
    enabled: enabled,
  });
}
