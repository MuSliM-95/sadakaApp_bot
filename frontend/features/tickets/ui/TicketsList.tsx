"use client";

import { BackButton } from "@/features/ui/BackButton";
import { useUserTicketsQuery } from "@/features/user/hooks/userTicketsQuery";
import { UserRole } from "@/features/user/types/user.types";
import { cn } from "@/lib/utils";
import PageLoader from "@/shared/components/ui/PageLoader";
import { Button } from "@/shared/components/ui/button";
import { Platform } from "@/shared/types/global.types";
import { useAppSelector } from "@/store/hooks";
import { RotateCcw, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTicketQuery } from "../hooks/useTicketQuery";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";
import { TicketModal } from "./TicketModal";
import { Input } from "@/shared/components/ui/input";

export function TicketsList() {
  const userState = useAppSelector((state) => state.ad.user);
  const { data, isLoading, refetch } = useUserTicketsQuery();
  const { data: profile, refetch: getProfile } = useUserQuery({
    enabled: true,
  });

  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: ticket, isLoading: ticketLoading } = useTicketQuery({
    selectedTicket,
    enabled: !!selectedTicket,
  });

  useEffect(() => {
    if (!userState) {
      getProfile();
    }
  }, []);

  const user = userState || profile;
  const isAdmin = user?.role === UserRole.admin;

  const updateTicketsPage = () => {
    refetch();
  };

  const filteredTickets = data?.filter((ticket) => 
  ticket.id.toString().includes(searchQuery)
);

  const platform = useAppSelector((state) => state.ad.platform);
  const fullscreen = useAppSelector((state) => state.ad.fullscreen);

  if (isLoading) return <PageLoader />;

  if (!data?.length) {
    return (
      <div className="bg-black/90 border min-h-screen text-white border-neutral-800">
        <div className="flex justify-between items-center">
          <BackButton className="sticky" />
          <Button onClick={updateTicketsPage} className="cursor-pointer">
            <RotateCcw />
          </Button>
        </div>

        <div className="flex flex-col mt-15 items-center justify-center min-h-[220px] p-6 rounded-2xl bg-black/90 border border-neutral-800 shadow-xl backdrop-blur-md text-center mx-4">
          <div className="text-3xl mb-3 animate-bounce text-emerald-400">
            🎫
          </div>

          <p className="text-sm text-neutral-400">У тебя пока нет билетов</p>

          <p className="text-xs text-neutral-500 mt-2">
            Получи первый билет, просмотрев рекламу
          </p>
        </div>
      </div>
    );
  }

  const ticketOpenHandler = (id: number) => {
    if (user?.role !== UserRole.admin) return;
    setSelectedTicket(id);
  };

  return (
    <div className={cn("min-h-screen gap-3 bg-neutral-950 text-white")}>
      {/* MODAL */}
      <TicketModal
        setSelectedTicket={setSelectedTicket}
        selectedTicket={selectedTicket}
        ticket={ticket}
      />

      <div
        className={cn(
          "min-h-screen",
          platform !== Platform.TDESKTOP && fullscreen
            ? "mt-20"
            : platform === Platform.TDESKTOP && fullscreen
            ? "mt-10"
            : ""
        )}
      >
        <div className="flex justify-between items-center">
          <BackButton className="sticky" />

          <Button onClick={updateTicketsPage} className="cursor-pointer">
            <RotateCcw />
          </Button>
        </div>
        {/* СЕКЦИЯ ПОИСКА ДЛЯ АДМИНА */}
        {isAdmin && (
          <div className="relative  mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <Input
              placeholder="Поиск по ID билета..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-neutral-900 border-neutral-800 focus:border-purple-500 transition-colors"
            />
            {searchQuery && (
              <X
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )}
          </div>
        )}

        <div className="grid grid-cols-3 w-full p-1 -mt-4 gap-3">
          {filteredTickets?.map((ticket) => (
            <div
              key={ticket.id}
              className={cn(
                "group cursor-pointer relative h-15 mt-10",
                "rounded-xl px-3 py-2",
                "border backdrop-blur-md",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-md",
                ticket.used
                  ? "bg-neutral-900 border-red-800 text-neutral-500"
                  : "bg-neutral-900/90 border-emerald-500/40 text-emerald-300 hover:shadow-emerald-500/20"
              )}
              onClick={() => ticketOpenHandler(ticket.id)}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[9px] tracking-widest text-neutral-500">
                  TICKET
                </span>

                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    ticket.used ? "bg-red-600" : "bg-emerald-400"
                  )}
                />
              </div>

              <div className="text-sm font-semibold tracking-wide">
                #{ticket.id}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
