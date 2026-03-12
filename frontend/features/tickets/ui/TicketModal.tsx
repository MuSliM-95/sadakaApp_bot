'use client'
import { Button } from "@/shared/components/ui/button";
import React, { SetStateAction } from "react";
import { ITicketR } from "../types/tickets,types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useWinnerTicketMutation } from "../hooks/useWinnerTicketMutation";
import { useWinnerDeleteTicketMutation } from "../hooks/useWinnerDeleteTicketMutation";

interface Props {
  className?: string;
  selectedTicket: number | null;
  setSelectedTicket: (value: SetStateAction<number | null>) => void;
  ticket?: ITicketR;
}

export const TicketModal: React.FC<Props> = ({
  className,
  selectedTicket,
  setSelectedTicket,
  ticket,
}) => {
  const { createWinnerTicket } = useWinnerTicketMutation();
  const { deleteWinnerTicket } = useWinnerDeleteTicketMutation();

const openTelegramUser = (username: string) => {
  const tg: any = window?.Telegram?.WebApp;

  if (tg) tg?.openTelegramLink(`https://t.me/${username}`);
  else window.open(`https://t.me/${username}`, "_blank");
};
  const handlerWinnerTicket = () => {
    if (!ticket) return;

    if(ticket.winner) {    
      deleteWinnerTicket(ticket.winner.id)
      return 
    }    
    createWinnerTicket({ ticketId: ticket.id });
  };

  return (
    <div className={className}>
      {/* MODAL */}
      {selectedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className="relative w-[90%] max-w-sm rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              size="icon"
              variant="ghost"
              className="absolute cursor-pointer right-2 top-2"
              onClick={() => setSelectedTicket(null)}
            >
              <X size={18} />
            </Button>

            <div className="space-y-5 text-center">
              <div className="text-4xl">🎫</div>

              <div>
                <h2 className="text-lg font-semibold tracking-wide">
                  Ticket #{ticket?.id}
                </h2>

                <p onClick={() => openTelegramUser(ticket?.user?.username!)} className="text-xs cursor-pointer text-neutral-500">
                  @{ticket?.user?.username}
                </p>
              </div>

              {/* STATUS */}
              <div
                className={cn(
                  "mx-auto w-fit rounded-full px-3 py-1 text-xs font-medium",
                  ticket?.used
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                )}
              >
                {ticket?.used ? "Использован" : "Активный билет"}
              </div>

              {/* INFO */}
              <div className="space-y-2 text-xs text-neutral-400">
                <div>
                  Создан:{" "}
                  <span className="text-neutral-200">
                    {ticket?.createdAt &&
                      new Date(ticket.createdAt).toLocaleString()}
                  </span>
                </div>

                <div>
                  Обновлен:{" "}
                  <span className="text-neutral-200">
                    {ticket?.updatedAt &&
                      new Date(ticket.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* ACTION */}
              {!ticket?.used && (
                <Button variant={'secondary'} onClick={handlerWinnerTicket} className="w-full mt-2  cursor-pointer">
                  {ticket?.winner ? "Отменить назначения" : "Назначит победителем "}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
