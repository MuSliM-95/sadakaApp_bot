import { inject, injectable } from "inversify";
import type {
  IProfile,
  IUser,
  IUserService,
} from "./interface/user.service.interface.js";
import { TYPES } from "../types.js";
import type { IUserRepository } from "./interface/user.repository.interface.js";
import { HTTPError } from "../errors/http.error.class.js";
import { UserRole, type User } from "./model/user.model.js";
import type { ITelegramUser } from "../types/global.js";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository
  ) {}
  public async createUser({
    telegramId,
    username,
    first_name,
  }: IUser): Promise<User> {
    const user = await this.userRepository.findOne(telegramId);
    if (user) return user;
    return this.userRepository.create({
      telegramId,
      username,
      first_name,
      role: UserRole.regular,
    });
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async getUsersAs(): Promise<User[]> {
    return this.userRepository.getUsersAs();
  }


  public async findProfile(telegramId: number): Promise<IProfile> {
    const user = await this.userRepository.findProfile(telegramId);

    if (!user) {
      throw new HTTPError(404, "Пользователь не найден.");
    }


    return {
      id: user.id,
      username: user.username || "",
      first_name: user.first_name || `User-${user.id}`,
      adsCount: user.ads?.length || 0,
      ticketsCount: user.tickets?.length || 0,
      role: user.role,
    };
  }

  public async updateUser(
    telegramId: number,
    username?: string
  ): Promise<number> {
    return this.userRepository.update(telegramId, username);
  }

  public async getUser(telegramId: number): Promise<User> {
    const user = await this.userRepository.findOne(telegramId);
    if (!user) {
      throw new HTTPError(404, "Пользователь не найден.");
    }

    return user;
  }
}
