import { useQuery } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";



export function useGameDataSaveQuery() {
	return useQuery({
		queryKey: ['get-game-session'],
		queryFn: () => pointsService
	})
}