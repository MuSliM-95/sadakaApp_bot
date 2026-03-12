"use client";

import { BackButton } from "@/features/ui/BackButton";
import { cn } from "@/lib/utils";
import { Platform } from "@/shared/types/global.types";
import { useAppSelector } from "@/store/hooks";
import React, { ReactNode } from "react";

interface Props {
  className?: string;
  children?: ReactNode;
}

export const PlatformBackButton: React.FC<Props> = ({
  className,
  children,
}) => {
  const platform = useAppSelector((state) => state.ad.platform);
  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between",
        platform !== Platform.TDESKTOP && fullscreen
          ? "pt-22"
          : platform === Platform.TDESKTOP && fullscreen
          ? "pt-10"
          : "pt-2"
      )}
    >
      <BackButton className={cn("sticky")} />
      {children}
    </div>
  );
};
