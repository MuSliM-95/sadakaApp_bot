import { api } from "@/shared/api/instance.api";
import { IProfile, ITicket, UserRating } from "../types/user.types";

class UserService {
  public async getProfile() {
    const response = await api.get<IProfile>(`api/user/profile`);

    return response;
  }
  public async getUsers() {
    const response = await api.get<UserRating[]>(`api/users`);
    console.log(response);

    return response;
  }

  public async getUserTickets() {
    const response = await api.get<ITicket[]>(`api/tickets/user`);
    return response;
  }
}

export const userService = new UserService();
