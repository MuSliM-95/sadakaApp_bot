"use client";

import dynamic from "next/dynamic";
import PageLoader from "@/shared/components/ui/PageLoader";

const TicketsListLazy = dynamic(
  () => import("@/features/tickets/ui/TicketsList").then((m) => m.TicketsList),
  {
    loading: () => <PageLoader />,
    ssr: false, // если нужно только на клиенте
  }
);

export default function Page() {
  return <TicketsListLazy />;
}
