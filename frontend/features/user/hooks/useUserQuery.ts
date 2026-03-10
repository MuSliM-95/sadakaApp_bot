import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/user.service";

export function useUserQuery(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: () => userService.getProfile(),
    enabled: options?.enabled,
  });
}
