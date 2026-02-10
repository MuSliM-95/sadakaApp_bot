import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
}

export const BackButton: React.FC<Props> = ({ className }) => {
  return (
    <Button
      className={cn("absolute top-2 left-2", className)}
      variant={"ghost"}
    >
      <Link href={"/"}>Назад</Link>
    </Button>
  );
};
