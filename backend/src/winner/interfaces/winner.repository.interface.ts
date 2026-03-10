import type { Winner } from "../model/winner.model.js";

export interface IWinnerRepository {
  create(ticketId: number): Promise<Winner>;
  findAll(): Promise<Winner[]>;
  findOne(ticketId: number): Promise<Winner | null>;
  delete(winnerId: number): Promise<number>;

}
