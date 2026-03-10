"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface TicketsActionsProps {
  role?: string;
  section: boolean;
  onMyTickets?: () => void;
  onAllTickets?: () => void;
}

export function TicketsActions({
  role,
  section,
  onMyTickets,
  onAllTickets,
}: TicketsActionsProps) {
  if (role === "ADMIN") return null;

  return (
    <div className="mt-4 p-3 bg-neutral-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-md">
      <div className="flex gap-3">
        <Button
          onClick={onMyTickets}
          variant="secondary"
          className={cn(
            !section
              ? "flex-1 rounded-xl cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-colors"
              : "flex-1 rounded-xl cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition-colors"
          )}
        >
          Мои тикеты
        </Button>

        <Button
          onClick={onAllTickets}
          className={cn(
            section
              ? "flex-1 rounded-xl cursor-pointer bg-neutral-800 hover:bg-neutral-700 transition-colors"
              : "flex-1 rounded-xl cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition-colors"
          )}
        >
          Все тикеты
        </Button>
      </div>
    </div>
  );
}
