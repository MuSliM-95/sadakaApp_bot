import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/block-blast.json";
import ru from "./locales/ru/block-blast.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { block_blast: en },
    ru: { block_blast: ru },
  },
  lng: "en", // дефолт
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;