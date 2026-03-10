import { User, UserRole } from "../src/user/model/user.model.ts";

declare module "express-session" {
  export interface SessionData {
    userId: number;       // id пользователя в твоей БД
    telegramId: number,    // telegram user id
  }
}

declare global {
  namespace Express {
    export interface Request {
      user: User | null;
    }
  }
}
