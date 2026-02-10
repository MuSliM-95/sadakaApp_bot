"use client";
import { useCallback, ReactElement, ReactNode } from "react";
import { Youtube } from "lucide-react";

import { useAdsgram } from "./useAdsgram";
import { ShowPromiseResult } from "@/adsgram";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

interface IProps {
  className?: string;
  children?: ReactNode;
}

export function ShowAdButton({ className, children }: IProps): ReactElement {
  const onReward = useCallback(() => {
    alert("Reward");
  }, []);
  const onError = useCallback((result: ShowPromiseResult) => {
    alert(JSON.stringify(result, null, 4));
  }, []);

  /**
   * Вставьте ваш blockId
   */
  const showAd = useAdsgram({
    blockId: process.env.NEXT_PUBLIC_BLOCK_ID!,
    onReward,
    onError,
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={cn(
            "flex absolute top-4 gap-2 right-10 items-center cursor-pointer",
            className
          )}
          onClick={showAd}
        >
          <Youtube /> {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Реклама</p>
      </TooltipContent>
    </Tooltip>
  );
}
