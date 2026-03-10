import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authService";

export function useAuthMutation() {
  const { data, mutate: login } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (initData: string) => authService.login(initData),
    onSuccess() {}
  });

  return { data, login };
}
