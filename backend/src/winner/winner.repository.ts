import { inject, injectable } from "inversify";
import type { IWinnerRepository } from "./interfaces/winner.repository.interface.js";
import { TYPES } from "../types.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import type { ModelStatic } from "sequelize";
import type { Winner } from "./model/winner.model.js";
import { Ticket } from "../ticket/model/ticket.model.js";
import { User } from "../user/model/user.model.js";

@injectable()
export class WinnerRepository implements IWinnerRepository {
  private _model: ModelStatic<Winner>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelizeService: ISequelizeService
  ) {
    this._model = this.sequelizeService.postgres.modelManager.getModel(
      "Winner"
    ) as ModelStatic<Winner>;
  }

  public async create(ticketId: number): Promise<Winner> {
    return this._model.create({ ticketId });
  }

  public async findAll(): Promise<Winner[]> {
    return this._model.findAll({
      include: [
        {
          model: Ticket,
          as: "ticket",
          include: [User],
        },
      ],
    });
  }

  public async findOne(ticketId: number): Promise<Winner | null> {
    return this._model.findOne({ where: { ticketId } });
  }

  public async delete(winnerId: number): Promise<number> {
    return this._model.destroy({ where: { id: winnerId } });
  }
}
