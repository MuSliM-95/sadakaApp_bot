"use client";

import GamesPage from "@/features/iframe-games/GamesPage";
import PageLoader from "@/shared/components/ui/PageLoader";
import dynamic from "next/dynamic";



const IframeGamesLazy = dynamic(
  () => import("@/features/iframe-games/iframe"),
  {
    loading: () => <PageLoader />,
    ssr: false, // если нужно только на клиенте
  }
);



export default function GamesMain() {


  return <GamesPage /> ;
}
