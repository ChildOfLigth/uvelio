import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import ua from "./locales/ua.json";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            ua: { translation: ua }
        },
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;