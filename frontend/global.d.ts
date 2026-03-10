// global.d.ts
interface Window {
  addLife?: () => void; // функция может быть или undefined
  Telegram?: {
    WebApp: {
      ready: () => void;
      initData: string;
      initDataUnsafe: {
        user?: {
          id: number;
          first_name?: string;
          last_name?: string;
          username?: string;
        };
      };
      onEvent: (event: string, callback: () => void) => void;
      // добавляй остальные методы, которые используешь
    };
  };
}
