"use client";
import { useCallback, ReactElement } from "react";

import { useAdsgram } from "./useAdsgram";
import { ShowPromiseResult } from "@/adsgram";

export function ShowAdButton(): ReactElement {
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
    <button
      className="flex flex-col items-center cursor-pointer"
      onClick={showAd}
    >
      {" "}
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-gray-900 dark:text-white"
      >
        <path d="M7 6v12l10-6z" />
      </svg>
      <p className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">
        Начать просмотр
      </p>
    </button>
  );
}
