import type { ITelegramUser } from "../../types/global.js";
import type { User, UserRole } from "../model/user.model.js";

export interface IUser {
  telegramId: number;
  username: string | null;
  first_name: string | null;
  role?: UserRole
}

export interface IProfile {
  id: number;
  username: string;
  first_name: string;
  adsCount: number;
  ticketsCount: number;
  role: UserRole
}

export interface IUserService {
  createUser(data: IUser): Promise<User>;
  getUsers(): Promise<User[]>;
  getUsersAs(): Promise<User[]>;
  findProfile(telegramId: number): Promise<IProfile>;
  updateUser(telegramId: number, username?: string): Promise<number>;
  getUser(telegramId: number): Promise<User | null>;
}
