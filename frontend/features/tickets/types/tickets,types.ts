import { IProfile } from "@/features/user/types/user.types";

export interface IWinner {
  id: number;
  ticketId: number;
  ticket: ITicketR
}

export interface ITicketR {
  id: number;
  telegramId: number;
  user: IProfile;
  used: boolean;
  winner: IWinner
  createdAt: Date;
  updatedAt: Date;
}

export interface IParams {
  ticketId: number;
}
