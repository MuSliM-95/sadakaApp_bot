import type { Winner } from "../model/winner.model.js";

export interface IWinnerService {
  createWinner(ticketId: number): Promise<Winner>;
  findAllWinners(): Promise<Winner[]>;
  deleteWinner(winnerId: number): Promise<number>
}
