"use client";

import PageLoader from "@/shared/components/ui/PageLoader";
import dynamic from "next/dynamic";

const BlockBlastLazy = dynamic(
  () => import("@/features/block-blast/ui/BlockBlast"),
  {
    loading: () => <PageLoader />,
    ssr: false,
  }
);

export default function BlockBlastPage() {
  return <BlockBlastLazy />;
}
