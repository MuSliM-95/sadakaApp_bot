"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  Ticket,
  Megaphone,
  Crown,
  RotateCcw,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/components/ui/card";
import { useUsersQuery } from "../hooks/useUsersQuery";
import { useUserQuery } from "../hooks/useUserQuery";
import { Button } from "@/shared/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { cn } from "@/lib/utils";
import PageLoader from "@/shared/components/ui/PageLoader";
import { useWinnersQuery } from "../hooks/useWinnersQuery";
import { PlatformBackButton } from "@/shared/components/ui/platform.back.button";
import { usePointsAllQuery } from "@/features/block-blast/hooks/usePointsAllQuery";
import { useTranslation } from "react-i18next";

export function Rating() {
  const { t } = useTranslation('rating');

  const [mode, setMode] = useState<"global" | "game">("global");

  const userState = useAppSelector((state) => state.ad.user);

  const { data: users = [], isLoading, refetch } = useUsersQuery();
  const { data: game = [], isLoading: gameLoading } = usePointsAllQuery();
  const { data: winners } = useWinnersQuery();

  const { data: user } = useUserQuery({
    enabled: !userState,
  });

  const currentUserId = userState ? Number(userState.id) : user?.id;

  const rankedUsers = useMemo(() => {
    return [...users].sort((a, b) =>
      b.ticketsCount !== a.ticketsCount
        ? b.ticketsCount - a.ticketsCount
        : b.adsCount - a.adsCount
    );
  }, [users]);

  const rankedGame = useMemo(() => {
    return [...game].sort((a, b) => b.score - a.score);
  }, [game]);

  const updatePageHandler = () => {
    refetch();
  };

  const getRankStyle = (index: number) => {
    if (index === 0)
      return "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-400/40";
    if (index === 1)
      return "bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-300/30";
    if (index === 2)
      return "bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-400/30";
    return "bg-white/5 border-white/10";
  };

  if (isLoading || gameLoading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen flex justify-center text-white p-4 pb-28 relative overflow-hidden bg-black">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_40%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.12),transparent_45%)]" />

      <div className="relative max-w-md w-full">

        <PlatformBackButton>
          <Button onClick={updatePageHandler} className="text-white">
            <RotateCcw />
          </Button>
        </PlatformBackButton>

        <div className="space-y-6 mt-6">

          {/* HEADER */}
          <div className="flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {t("rating.title")}
            </h1>
          </div>

          {/* SWITCH */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => setMode("global")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all",
                mode === "global"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {t("rating.global")}
            </button>

            <button
              onClick={() => setMode("game")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm transition-all",
                mode === "game"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              )}
            >
              {t("rating.game")}
            </button>
          </div>

          {/* WINNERS */}
          {mode === "global" && winners && winners.length > 0 && (
            <div className="space-y-3">
              {winners.map((winner) => (
                <Card
                  key={winner.id}
                  className="text-white border-white/10 bg-white/5 backdrop-blur-md"
                >
                  <CardContent className="flex justify-between p-4">
                    <div>{winner.ticket.user.first_name}</div>
                    <div>#{winner.ticket.id}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* LIST */}
          <div className="space-y-2">
            {(mode === "global" ? rankedUsers : rankedGame).map(
              (item: any, index) => {
                const id =
                  mode === "global" ? item.id : item.user.id;

                const isCurrentUser = id === currentUserId;

                const name =
                  mode === "global"
                    ? item.first_name
                    : item.user.username || "Player";

                return (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card
                      className={cn(
                        "border text-white transition-all duration-300 backdrop-blur-md bg-white/5",
                        "hover:bg-white/10 hover:shadow-lg",
                        getRankStyle(index),
                        isCurrentUser &&
                          "ring-2 ring-emerald-400/70 border-emerald-400"
                      )}
                    >
                      <CardContent className="flex justify-between p-4">

                        {/* LEFT */}
                        <div className="flex items-center gap-3">
                          <div className="w-8 text-center font-bold">
                            {index === 0 ? (
                              <Crown className="w-5 h-5 text-yellow-400" />
                            ) : (
                              `#${index + 1}`
                            )}
                          </div>

                          <div className="font-semibold">
                            {name}
                            {isCurrentUser && (
                              <span className="text-emerald-400 ml-1">
                                ({t("rating.you")})
                              </span>
                            )}
                          </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex gap-6 text-sm items-center">
                          {mode === "global" ? (
                            <>
                              <div className="flex items-center gap-1">
                                <Ticket className="w-4 h-4 text-green-400" />
                                {item.ticketsCount}
                              </div>
                              <div className="flex items-center gap-1">
                                <Megaphone className="w-4 h-4 text-blue-400" />
                                {item.adsCount}
                              </div>
                            </>
                          ) : (
                            <div className="text-lg font-black">
                              {item.score.toLocaleString()}
                            </div>
                          )}
                        </div>

                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }
            )}
          </div>

        </div>
      </div>
    </div>
  );
}