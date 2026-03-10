import { useQuery } from "@tanstack/react-query";
import { ticketService } from "../services/ticket.service";

export function useTicketsQuery() {
  return useQuery({
    queryKey: ["get-tickets"],
    queryFn: () => ticketService.getTickets(),
  });

}
