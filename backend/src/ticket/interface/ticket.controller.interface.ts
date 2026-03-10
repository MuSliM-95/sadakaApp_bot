import type { NextFunction, Request, Response } from "express";

export interface ITicketController {
  getTickets(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTicket(req: Request, res: Response, next: NextFunction): Promise<void>;
  getTicketsCount(req: Request, res: Response, next: NextFunction): Promise<void>;
}
