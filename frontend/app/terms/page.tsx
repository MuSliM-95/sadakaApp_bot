'use client'

import PageLoader from "@/shared/components/ui/PageLoader";
import dynamic from "next/dynamic";

const LegalPageLazy = dynamic(
  () => import("@/features/home/ui/LegalPage"),
  {
    loading: () => <PageLoader />,
	ssr: false
  }
);

export default function LegalPage() {
  return <LegalPageLazy />;
}
