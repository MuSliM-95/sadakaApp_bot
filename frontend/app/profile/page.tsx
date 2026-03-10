"use client";

import PageLoader from "@/shared/components/ui/PageLoader";
import dynamic from "next/dynamic";

const ProfileList = dynamic(
  () => import("@/features/user/ui/Profile").then((m) => m.Profile),
  {
    loading: () => <PageLoader />,
    ssr: false, // если нужно только на клиенте
  }
);

export default function ProfilePage() {
  return <ProfileList />;
}
