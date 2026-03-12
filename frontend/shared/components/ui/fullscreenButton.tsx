import { cn } from "@/lib/utils";
import { updateScreen } from "@/store/ad.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Maximize2, Minimize2 } from "lucide-react";

interface Props {
  className?: string;
  isFullscreen: boolean;
}

export const FullscreenButton: React.FC<Props> = ({
  className,
  isFullscreen,
}) => {
  const dispatch = useAppDispatch();
  const fullscreen = useAppSelector((state) => state.ad.fullscreen);
  const toggleFullscreen = () => {
    dispatch(updateScreen(!fullscreen));
  };
  return (
    <button
      onClick={toggleFullscreen}
      className={cn(
        `
md:flex
cursor-pointer
fixed top-13 right-24 z-50
items-center gap-2
px-4 py-2
rounded-full
bg-neutral-900/70
backdrop-blur-md
border border-white/10
shadow-xl
text-sm text-neutral-300
hover:text-white
hover:bg-neutral-800
transition-all duration-200
active:scale-95
`,
        isFullscreen || "top-2 right-4",
        className
      )}
    >
      {isFullscreen ? (
        <>
          <Minimize2 size={16} />
        </>
      ) : (
        <>
          <Maximize2 size={16} />
        </>
      )}
    </button>
  );
};
