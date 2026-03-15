import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { savePlatform } from "@/store/ad.slice";

export const useTelegramWebApp = (fullscreen: boolean) => {
  const dispatch = useAppDispatch();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // 1️⃣ инициализация Telegram
  useEffect(() => {
    const webApp: any = window.Telegram?.WebApp;
    if (!webApp) return;

    const platform = webApp.platform;
    dispatch(savePlatform(platform));

    webApp.ready();
    webApp.expand();

    setIsFullscreen(webApp.isFullscreen);

    const handler = () => {
      setIsFullscreen(webApp.isFullscreen);
    };

    webApp.onEvent("fullscreenChanged", handler);

    return () => {
      webApp.offEvent("fullscreenChanged", handler);
    };
  }, [dispatch]);

  // 2️⃣ управление fullscreen
  useEffect(() => {
    const webApp: any = window.Telegram?.WebApp;
    if (!webApp) return;

    if (webApp.initData && fullscreen && !webApp.isFullscreen) {
      webApp.requestFullscreen?.();
    }

    if (webApp.initData && !fullscreen && webApp.isFullscreen) {
      webApp.exitFullscreen?.();
    }
  }, [fullscreen]);

  return {
    isFullscreen,
  };
};