import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  onclick?: () => void
}

export const BackButton: React.FC<Props> = ({ className, onclick }) => {
  return (
    <Button
      className={cn("absolute top-2 left-2", className)}
      variant={"ghost"}
      onClick={onclick}
    >
      <Link href={`/`}>Назад</Link>
    </Button>
  );
};
