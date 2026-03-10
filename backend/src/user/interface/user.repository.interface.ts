import type { User } from "../model/user.model.js";
import type { IUser } from "./user.service.interface.js";

export interface IUserRepository {
  create(data: IUser): Promise<User>;
  findAll(): Promise<User[]>;
  findOne(telegramId: number): Promise<User | null>;
  update(telegramId: number, username: string): Promise<number>;
  findProfile(telegramId: number): Promise<User | null>;
  getUsersAs(): Promise<User[]>;
}
