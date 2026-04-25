import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/block-blast.json";
import ru from "./locales/ru/block-blast.json";
import ratingEn from "./locales/en/rating.json";
import ratingRu from "./locales/ru/rating.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { block_blast: en, rating: ratingEn},
    ru: { block_blast: ru, rating: ratingRu },
  },
  lng: "ru", // дефолт
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;