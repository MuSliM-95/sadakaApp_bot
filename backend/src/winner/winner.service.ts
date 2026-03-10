import { inject, injectable } from "inversify";
import type { IWinnerService } from "./interfaces/winner.service.interface.js";
import { TYPES } from "../types.js";
import type { IWinnerRepository } from "./interfaces/winner.repository.interface.js";
import type { Winner } from "./model/winner.model.js";
import { HTTPError } from "../errors/http.error.class.js";

@injectable()
export class WinnerService implements IWinnerService {
  constructor(
    @inject(TYPES.WinnerRepository)
    private readonly winnerRepository: IWinnerRepository
  ) {}
  public async createWinner(ticketId: number): Promise<Winner> {
    const isExists = await this.winnerRepository.findOne(ticketId);

    if (isExists) {
      throw new HTTPError(409, "Этот билет уже выбран");
    }

    return this.winnerRepository.create(ticketId);
  }

  public async findAllWinners(): Promise<Winner[]> {
    return this.winnerRepository.findAll();
  }

  public async deleteWinner(winnerId: number): Promise<number> {
    return this.winnerRepository.delete(winnerId);
  }
}
