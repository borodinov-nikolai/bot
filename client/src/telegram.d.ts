interface TelegramWebApp {
    initDataUnsafe: any;
    close: () => void;
    ready: () => void;
    [key: string]: any
    // добавьте другие методы и свойства, которые вы используете
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  