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
    blockId: '22552',
    onReward,
    onError,
  });

  return (
    <button className="h-[50px] w-[50px] cursor-pointer" onClick={showAd}>
      {" "}
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        className="text-gray-900 dark:text-white"
      >
        <path d="M7 6v12l10-6z" />
      </svg>
    </button>
  );
}
