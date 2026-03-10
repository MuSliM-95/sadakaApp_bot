"use client";

import PageLoader from "@/shared/components/ui/PageLoader";
import dynamic from "next/dynamic";

const PuzzleLazy = dynamic(
  () => import("@/features/puzzle/ui/Puzzle").then((m) => m.MosaicGame),
  {
    loading: () => <PageLoader />,
    ssr: false, // если нужно только на клиенте
  }
);

export default function MosaicGame() {
  return <PuzzleLazy />;
}
