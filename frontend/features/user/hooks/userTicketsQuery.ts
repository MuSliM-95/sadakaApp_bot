import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";


export function useUserTicketsQuery() {
  return useQuery({
    queryKey: ["get-user-tickets"],
    queryFn: () => userService.getUserTickets(),
  });
}
