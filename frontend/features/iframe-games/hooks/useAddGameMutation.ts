import { useMutation } from "@tanstack/react-query";
import { gameService } from "../services/game.service";
import { IGameAdd } from "../types/types";
import { toast } from "sonner";
import { toastMessageHandler } from "@/shared/utils/toast-message-handler";

export function useAddGameMutation() {
  const { data, mutate: addGame } = useMutation({
    mutationKey: ["add-game"],
    mutationFn: (data: IGameAdd) => gameService.addGame(data),
    onSuccess(data) {
      toast.message(data.message);
    },
    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { data, addGame };
}
