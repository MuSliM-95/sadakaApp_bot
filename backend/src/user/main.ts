import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import { TYPES } from "../types.js";
import { User } from "./model/user.model.js";
import { UserService } from "./user.service.js";
import type { IUserService } from "./interface/user.service.interface.js";
import { UserRepository } from "./user.repository.js";
import type { IUserRepository } from "./interface/user.repository.interface.js";
import { UserController } from "./user.controller.js";
import type { IUserController } from "./interface/user.controller.interface.js";

export const userBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<typeof User>(TYPES.Models).toConstantValue(User);
    options.bind<IUserService>(TYPES.UserService).to(UserService);
    options.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
    options.bind<IUserController>(TYPES.UserController).to(UserController);
  }
);
