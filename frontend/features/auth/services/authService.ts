import { api } from "@/shared/api/instance.api";

class AuthService {
  public async login(initData: string) {
    const response = await api.post("api/auth/telegram", {
      initData,
    });

    return response;
  }
}

export const authService = new AuthService();
