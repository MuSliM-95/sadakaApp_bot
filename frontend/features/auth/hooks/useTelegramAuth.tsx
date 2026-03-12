'use client'
import { api } from "@/shared/api/instance.api";
import { useEffect } from "react";
import { useAuthMutation } from "./useAuthMutation";


export function useTelegramAuth() {
  const { login } = useAuthMutation();

  useEffect(() => {
    const init = async () => {
      try {
        // проверяем есть ли сессия
        await api.get("api/user/profile");

        // если ответ 200 → сессия есть
        return;
      } catch {
		  // если 401 → делаем login
		  
		  const tg: any = window.Telegram?.WebApp;
		  const initData = tg.initData;
		  
        login(initData);
      }
    };

    init();
  }, [login]);
}