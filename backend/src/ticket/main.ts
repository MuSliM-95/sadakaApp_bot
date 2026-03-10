import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import { TYPES } from "../types.js";
import { Ticket } from "./model/ticket.model.js";
import type { ITicketService } from "./interface/ticket.service.interface.js";
import { TicketService } from "./ticket.service.js";
import { TicketRepository } from "./ticket.repository.js";
import type { ITicketRepository } from "./interface/ticket.repository.interface.js";
import { TicketController } from "./ticket.controller.js";
import type { ITicketController } from "./interface/ticket.controller.interface.js";

export const ticketBindings = new ContainerModule(
  (options: ContainerModuleLoadOptions) => {
    options.bind<typeof Ticket>(TYPES.Models).toConstantValue(Ticket);
    options.bind<ITicketController>(TYPES.TicketController).to(TicketController);
    options.bind<ITicketService>(TYPES.TicketService).to(TicketService);
    options.bind<ITicketRepository>(TYPES.TicketRepository).to(TicketRepository);
  }
);
