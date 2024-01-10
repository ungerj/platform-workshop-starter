import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationDE from "./locales/de.json";

const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  keySeparator: false, // We do not use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // React already safes from XSS
  },
});

export default i18n;
