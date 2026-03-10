'use client'

import PageLoader from "@/shared/components/ui/PageLoader";
import dynamic from "next/dynamic";

const RatingLazy = dynamic(
  () => import("@/features/user/ui/Rating").then((m) => m.Rating),
  {
    loading: () => <PageLoader />,
	ssr: false
  }
);

export default function RatingPage() {
  return <RatingLazy />;
}
