import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";


export function useUsersQuery() {
  return useQuery({
    queryKey: ["get-users"],
    queryFn: () => userService.getUsers(),
  });
}
