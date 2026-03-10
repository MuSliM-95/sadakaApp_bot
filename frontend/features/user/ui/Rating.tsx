"use client";

import { useMemo } from "react";
import { Trophy, Ticket, Megaphone, Crown, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { useUserQuery } from "../hooks/useUserQuery";
import { BackButton } from "@/features/ui/BackButton";
import { Button } from "@/shared/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import { Platform } from "@/shared/types/global.types";
import PageLoader from "@/shared/components/ui/PageLoader";
import { useWinnersQuery } from "../hooks/useWinnersQuery";

export function Rating() {
  const userSate = useAppSelector((state) => state.ad.user);
  const platform = useAppSelector((state) => state.ad.platform);
  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  const { data: users = [], isLoading, refetch } = useUsersQuery();
  const { data: winners } = useWinnersQuery();

  const { data: user } = useUserQuery({
    enabled: !userSate,
  });

  const currentUserId = userSate ? Number(userSate.id) : user?.id;

  // 2. Формируем основной рейтинг (исключая победителей)
  const rankedUsers = useMemo(() => {
    return users.sort((a, b) =>
      b.ticketsCount !== a.ticketsCount
        ? b.ticketsCount - a.ticketsCount
        : b.adsCount - a.adsCount
    );
  }, [users]);

  const updatePageHandler = () => {
    refetch();
  };

  const currentUserRank = rankedUsers.findIndex((u) => u.id === currentUserId);
  const currentUserData = rankedUsers[currentUserRank];

  const getRankStyle = (index: number) => {
    if (index === 0) return "bg-yellow-500/10 border-yellow-500/30";
    if (index === 1) return "bg-gray-400/10 border-gray-400/30";
    if (index === 2) return "bg-orange-500/10 border-orange-500/30";
    return "bg-neutral-900 border-neutral-800";
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className={cn("min-h-screen bg-black text-white p-4 pb-28")}>
      {" "}
      {/* Отступ снизу для плашки */}
      <div
        className={cn(
          "flex w-full justify-between items-center",
          platform !== Platform.TDESKTOP
            ? "mt-20"
            : platform === Platform.TDESKTOP && fullscreen
            ? "mt-10"
            : ""
        )}
      >
        <BackButton className="sticky" />
        <Button onClick={updatePageHandler} className="cursor-pointer">
          <RotateCcw />
        </Button>
      </div>
      <div className="max-w-3xl mx-auto space-y-6 mt-10">
        <div className="flex items-center justify-center gap-3">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <h1 className="text-2xl font-bold">Рейтинг игроков</h1>
        </div>

        {/* --- СЕКЦИЯ ПОБЕДИТЕЛЕЙ --- */}
        {winners && winners.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider ml-1">
              Наши победители
            </h2>

            {winners.map((winner, index) => {
              const medals = [
                "🥇",
                "🥈",
                "🥉",
                "④",
                "⑤",
                "⑥",
                "⑦",
                "⑧",
                "⑨",
                "⑩",
              ];

              return (
                <motion.div
                  key={winner.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }} // Добавляем приятный микро-взаимодействие
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="relative overflow-hidden border border-purple-500/30 bg-slate-900/50 backdrop-blur-md transition-colors hover:border-purple-400/50">
                    {/* Световой акцент на фоне */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent pointer-events-none" />

                    <CardContent className="relative flex items-center  sm:p-4">
                      <div className="flex items-center w-full justify-between gap-4">
                        {/* LEFT: Medal & User Info */}
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-3xl shadow-inner shadow-purple-500/20">
                            {medals[index] || "🏆"}
                          </div>

                          <div className="flex flex-col">
                            <span className="text-white font-bold text-lg leading-tight tracking-wide">
                              {winner.ticket.user.first_name}
                            </span>
                            <span className="text-xs font-medium uppercase tracking-wider text-purple-400">
                              {index + 1} место
                            </span>
                          </div>
                        </div>

                        {/* RIGHT: Ticket ID */}
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-purple-400/60 font-mono uppercase">
                            Билет
                          </span>
                          <span className="text-xl font-black italic text-purple-200 tabular-nums">
                            #{winner.ticket.id}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* --- ОСНОВНОЙ РЕЙТИНГ --- */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider ml-1">
            Текущая таблица
          </h2>
          {rankedUsers.map((item, index) => {
            const isCurrentUser = item.id === currentUserId;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card
                  className={`border transition-all ${getRankStyle(index)} ${
                    isCurrentUser
                      ? "ring-2 ring-emerald-500 border-emerald-500 z-10"
                      : ""
                  }`}
                >
                  <CardContent className="flex justify-between p-4">
                    <div className="flex items-center text-white gap-3">
                      <div className="w-8 text-center font-bold">
                        {index === 0 ? (
                          <Crown className="w-5 h-5 text-yellow-400" />
                        ) : (
                          `#${index + 1}`
                        )}
                      </div>
                      <div className="font-semibold">
                        {item.first_name}{" "}
                        {isCurrentUser && (
                          <span className="text-emerald-400 ml-1">(Вы)</span>
                        )}
                      </div>
                    </div>

                    <div className="flex text-white gap-6 text-sm items-center">
                      <div className="flex items-center gap-1">
                        <Ticket className="w-4 h-4 text-green-400" />
                        {item.ticketsCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <Megaphone className="w-4 h-4 text-blue-400" />
                        {item.adsCount}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* --- ЗАКРЕПЛЕННЫЙ ПОЛЬЗОВАТЕЛЬ (STICKY BOTTOM) --- */}
      {currentUserRank >= 0 && (
        <div className="fixed bottom-4 left-0 right-0 px-4 z-50 pointer-events-none">
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="max-w-3xl mx-auto pointer-events-auto"
          >
            <Card className="bg-emerald-600 border-emerald-400 text-white shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
              <CardContent className="flex justify-between p-2 items-center">
                <div className="flex items-center gap-4">
                  {/* Добавили + 1, так как индекс начинается с 0 */}
                  <div className="bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 font-bold text-lg">
                    #{currentUserRank + 1}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase opacity-70 font-bold tracking-tight">
                      Ваша позиция
                    </div>
                    <div className="font-bold leading-tight">
                      {currentUserData?.first_name}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 border-l border-white/20 pl-4">
                  <div className="text-center">
                    <div className="text-[10px] opacity-70 flex justify-center">
                      <Ticket className="w-3 h-3" />
                    </div>
                    <div className="font-bold">
                      {currentUserData?.ticketsCount}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] opacity-70 flex justify-center">
                      <Megaphone className="w-3 h-3" />
                    </div>
                    <div className="font-bold">{currentUserData?.adsCount}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
