import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "../services/ticket.service";
import { IParams } from "../types/tickets,types";
// import { toast } from "sonner";
import { toastMessageHandler } from "@/shared/utils/toast-message-handler";

export function useWinnerTicketMutation() {
  const queryClient = useQueryClient();
  const { data, mutate: createWinnerTicket } = useMutation({
    mutationKey: ["create-winner-ticket"],
    mutationFn: (params: IParams) => ticketService.createWinnerTicket(params),
    onSuccess(data) {
      // toast.message(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-ticket"] });
    },

    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { createWinnerTicket, data };
}
