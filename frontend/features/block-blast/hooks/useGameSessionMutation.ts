import { useMutation } from "@tanstack/react-query";
import { pointsService } from "../services/pointsService";



export function useGameSessionMutation() {
	return useMutation({
		mutationKey: ['game-session'],
		mutationFn: () => pointsService.gameSession(),
		onSuccess() {

		}
	})
}