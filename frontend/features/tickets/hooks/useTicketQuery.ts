import { useQuery } from "@tanstack/react-query";
import { ticketService } from "../services/ticket.service";

interface IParams {
  selectedTicket: number | null;
  enabled: boolean;
}

export function useTicketQuery({ selectedTicket, enabled }: IParams) {
  return useQuery({
    queryKey: ["get-ticket", selectedTicket],
    queryFn: () => ticketService.getTicket(selectedTicket!),
    enabled: enabled,
  });
}
