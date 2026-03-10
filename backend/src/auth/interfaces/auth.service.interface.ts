import type { Request } from "express";
import type { AuthDto } from "../dto/login.dto.js";

export interface IAuthService {
  login(req: Request, body: AuthDto): Promise<void>;
}
