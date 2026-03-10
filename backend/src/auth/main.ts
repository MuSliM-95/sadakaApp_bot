import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import type { IAuthController } from "./interfaces/auth.controller.interface.js";
import type { IAuthService } from "./interfaces/auth.service.interface.js";
import { TYPES } from "../types.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";



export const authBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
   options.bind<IAuthController>(TYPES.AuthController).to(AuthController)
   options.bind<IAuthService>(TYPES.AuthService).to(AuthService)
})