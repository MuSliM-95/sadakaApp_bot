import React from "react";
import { motion } from "motion/react";
import { TToast } from "../types/points.types";
import { Check, X } from "lucide-react";

interface Props {
  className?: string;
  toast: TToast;
}

export const Toast: React.FC<Props> = ({ className, toast }) => {
  return (
    <>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[200px]"
          style={{
            backgroundColor:
              toast.type === "error"
                ? "#ef4444"
                : toast.type === "success"
                ? "#22c55e"
                : "#3b82f6",
            color: "white",
          }}
        >
          {toast.type === "success" && <Check size={18} strokeWidth={3} />}
          {toast.type === "error" && <X size={18} strokeWidth={3} />}
          <span className="font-bold text-sm">{toast.message}</span>
        </motion.div>
      )}
    </>
  );
};
