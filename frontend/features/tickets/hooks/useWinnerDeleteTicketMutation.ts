import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ticketService } from "../services/ticket.service";
// import { toast } from "sonner";
import { toastMessageHandler } from "@/shared/utils/toast-message-handler";

export function useWinnerDeleteTicketMutation() {
  const queryClient = useQueryClient();
  const { data, mutate: deleteWinnerTicket } = useMutation({
    mutationKey: ["delete-winner-ticket"],
    mutationFn: (id: number) => ticketService.deleteWinnerTicket(id),
    onSuccess(data) {
      //   toast.message(data.message);
      queryClient.invalidateQueries({ queryKey: ["get-ticket"] });
    },

    onError(error) {
      toastMessageHandler(error);
    },
  });

  return { deleteWinnerTicket, data };
}
