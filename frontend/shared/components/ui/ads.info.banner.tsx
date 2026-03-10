import React from "react";
import { createPortal } from "react-dom";

interface Props {
  className?: string;
  isPreparing: boolean;
  countdown: number
}

export const AdsInfoBanner: React.FC<Props> = ({ className, isPreparing, countdown }) => {
  return (
    <div className={className}>
      {isPreparing &&
        createPortal(
          <div className="fixed inset-0 z-[2147483647] bg-black flex items-center justify-center">
            <div className="flex flex-col items-center text-center px-6 gap-8">
              <h2 className="text-white text-3xl font-bold">Реклама</h2>

              <p className="text-gray-400 max-w-md">
                Спасибо, что смотрите рекламу — это помогает нам
              </p>

              <div className="text-white text-7xl font-semibold tabular-nums">
                {countdown}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
