import type { Request } from "express";
import type { User, UserRole } from "../../user/model/user.model.js";

export interface IUserSession {
  id: number;
  telegramId: number;
  role: UserRole;
}


export interface ISessionService {
  saveSession(req: Request, user: IUserSession): Promise<{ user: IUserSession }>;
  deleteSession: (req: Request) => Promise<void>;
}
