import { inject, injectable } from "inversify";
import type { ITicketRepository } from "./interface/ticket.repository.interface.js";
import type { Ticket } from "./model/ticket.model.js";
import { TYPES } from "../types.js";
import type { ISequelizeService } from "../db/sequelize.interface.js";
import type { ModelStatic, Transaction } from "sequelize";
import { User } from "../user/model/user.model.js";
import { Winner } from "../winner/model/winner.model.js";

@injectable()
export class TicketRepository implements ITicketRepository {
  private _model: ModelStatic<Ticket>;
  constructor(
    @inject(TYPES.SequelizeService)
    private readonly sequelize: ISequelizeService
  ) {
    this._model = this.sequelize.postgres.modelManager.getModel(
      "Ticket"
    ) as ModelStatic<Ticket>;
  }

  public async create(telegramId: number, t: Transaction): Promise<Ticket> {
    return this._model.create({ telegramId, used: false }, { transaction: t });
  }

  public async findAll(telegramId: number): Promise<Ticket[]> {
    return this._model.findAll({ where: { telegramId } });
  }

  public async findOne(id: number): Promise<Ticket | null> {
    return this._model.findByPk(id, { include: [User, Winner] });
  }

  public async findTicketsAll(): Promise<Ticket[]> {
    return this._model.findAll();
  }

  public async findAllCount(telegramId: number): Promise<number> {
    return this._model.count({ where: { telegramId } });
  }
}
