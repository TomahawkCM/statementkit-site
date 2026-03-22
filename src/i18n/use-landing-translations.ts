"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { track } from "@vercel/analytics";
import { en, type LandingStrings } from "./landing-strings";

// Locale metadata for the dropdown (all 113 locales)
export const LOCALE_METADATA: Record<
  string,
  { label: string; dir: "ltr" | "rtl"; currency: string }
> = {
  "af-ZA": { label: "Afrikaans", dir: "ltr", currency: "ZAR" },
  "am-ET": { label: "Amharic", dir: "ltr", currency: "ETB" },
  "ar-AE": { label: "العربية (الإمارات)", dir: "rtl", currency: "AED" },
  "ar-SA": { label: "العربية (السعودية)", dir: "rtl", currency: "SAR" },
  "az-AZ": { label: "Azərbaycan", dir: "ltr", currency: "AZN" },
  "be-BY": { label: "Беларуская", dir: "ltr", currency: "BYN" },
  "bg-BG": { label: "Български", dir: "ltr", currency: "BGN" },
  "bn-BD": { label: "বাংলা (বাংলাদেশ)", dir: "ltr", currency: "BDT" },
  "bn-IN": { label: "বাংলা (ভারত)", dir: "ltr", currency: "INR" },
  "bs-BA": { label: "Bosanski", dir: "ltr", currency: "BAM" },
  "ca-ES": { label: "Català", dir: "ltr", currency: "EUR" },
  "cs-CZ": { label: "Čeština", dir: "ltr", currency: "CZK" },
  "cy-GB": { label: "Cymraeg", dir: "ltr", currency: "GBP" },
  "da-DK": { label: "Dansk", dir: "ltr", currency: "DKK" },
  "de-AT": { label: "Deutsch (Österreich)", dir: "ltr", currency: "EUR" },
  "de-CH": { label: "Deutsch (Schweiz)", dir: "ltr", currency: "CHF" },
  "de-DE": { label: "Deutsch (Deutschland)", dir: "ltr", currency: "EUR" },
  "el-GR": { label: "Ελληνικά", dir: "ltr", currency: "EUR" },
  "en-AU": { label: "English (Australia)", dir: "ltr", currency: "AUD" },
  "en-CA": { label: "English (Canada)", dir: "ltr", currency: "CAD" },
  "en-GB": { label: "English (UK)", dir: "ltr", currency: "GBP" },
  "en-IE": { label: "English (Ireland)", dir: "ltr", currency: "EUR" },
  "en-IN": { label: "English (India)", dir: "ltr", currency: "INR" },
  "en-NZ": { label: "English (New Zealand)", dir: "ltr", currency: "NZD" },
  "en-SG": { label: "English (Singapore)", dir: "ltr", currency: "SGD" },
  "en-US": { label: "English (US)", dir: "ltr", currency: "USD" },
  "en-XA": { label: "English (Pseudo)", dir: "ltr", currency: "USD" },
  "en-ZA": { label: "English (South Africa)", dir: "ltr", currency: "ZAR" },
  "es-AR": { label: "Español (Argentina)", dir: "ltr", currency: "ARS" },
  "es-BO": { label: "Español (Bolivia)", dir: "ltr", currency: "BOB" },
  "es-CL": { label: "Español (Chile)", dir: "ltr", currency: "CLP" },
  "es-CO": { label: "Español (Colombia)", dir: "ltr", currency: "COP" },
  "es-CR": { label: "Español (Costa Rica)", dir: "ltr", currency: "CRC" },
  "es-DO": {
    label: "Español (Rep. Dominicana)",
    dir: "ltr",
    currency: "DOP",
  },
  "es-EC": { label: "Español (Ecuador)", dir: "ltr", currency: "USD" },
  "es-ES": { label: "Español (España)", dir: "ltr", currency: "EUR" },
  "es-GT": { label: "Español (Guatemala)", dir: "ltr", currency: "GTQ" },
  "es-HN": { label: "Español (Honduras)", dir: "ltr", currency: "HNL" },
  "es-MX": { label: "Español (México)", dir: "ltr", currency: "MXN" },
  "es-NI": { label: "Español (Nicaragua)", dir: "ltr", currency: "NIO" },
  "es-PA": { label: "Español (Panamá)", dir: "ltr", currency: "PAB" },
  "es-PE": { label: "Español (Perú)", dir: "ltr", currency: "PEN" },
  "es-PR": { label: "Español (Puerto Rico)", dir: "ltr", currency: "USD" },
  "es-PY": { label: "Español (Paraguay)", dir: "ltr", currency: "PYG" },
  "es-SV": { label: "Español (El Salvador)", dir: "ltr", currency: "USD" },
  "es-US": { label: "Español (EE.UU.)", dir: "ltr", currency: "USD" },
  "es-UY": { label: "Español (Uruguay)", dir: "ltr", currency: "UYU" },
  "es-VE": { label: "Español (Venezuela)", dir: "ltr", currency: "VES" },
  "et-EE": { label: "Eesti", dir: "ltr", currency: "EUR" },
  "eu-ES": { label: "Euskara", dir: "ltr", currency: "EUR" },
  "fa-IR": { label: "فارسی", dir: "rtl", currency: "IRR" },
  "fi-FI": { label: "Suomi", dir: "ltr", currency: "EUR" },
  "fil-PH": { label: "Filipino", dir: "ltr", currency: "PHP" },
  "fr-BE": { label: "Français (Belgique)", dir: "ltr", currency: "EUR" },
  "fr-CA": { label: "Français (Canada)", dir: "ltr", currency: "CAD" },
  "fr-CH": { label: "Français (Suisse)", dir: "ltr", currency: "CHF" },
  "fr-FR": { label: "Français (France)", dir: "ltr", currency: "EUR" },
  "gl-ES": { label: "Galego", dir: "ltr", currency: "EUR" },
  "gu-IN": { label: "ગુજરાતી", dir: "ltr", currency: "INR" },
  "he-IL": { label: "עברית", dir: "rtl", currency: "ILS" },
  "hi-IN": { label: "हिन्दी", dir: "ltr", currency: "INR" },
  "hr-HR": { label: "Hrvatski", dir: "ltr", currency: "EUR" },
  "hu-HU": { label: "Magyar", dir: "ltr", currency: "HUF" },
  "hy-AM": { label: "Հայերեն", dir: "ltr", currency: "AMD" },
  "id-ID": { label: "Bahasa Indonesia", dir: "ltr", currency: "IDR" },
  "is-IS": { label: "Íslenska", dir: "ltr", currency: "ISK" },
  "it-CH": { label: "Italiano (Svizzera)", dir: "ltr", currency: "CHF" },
  "it-IT": { label: "Italiano (Italia)", dir: "ltr", currency: "EUR" },
  "ja-JP": { label: "日本語", dir: "ltr", currency: "JPY" },
  "ka-GE": { label: "ქართული", dir: "ltr", currency: "GEL" },
  "kk-KZ": { label: "Қазақ", dir: "ltr", currency: "KZT" },
  "km-KH": { label: "ខ្មែរ", dir: "ltr", currency: "KHR" },
  "kn-IN": { label: "ಕನ್ನಡ", dir: "ltr", currency: "INR" },
  "ko-KR": { label: "한국어", dir: "ltr", currency: "KRW" },
  "ky-KG": { label: "Кыргызча", dir: "ltr", currency: "KGS" },
  "lo-LA": { label: "ລາວ", dir: "ltr", currency: "LAK" },
  "lt-LT": { label: "Lietuvių", dir: "ltr", currency: "EUR" },
  "lv-LV": { label: "Latviešu", dir: "ltr", currency: "EUR" },
  "mk-MK": { label: "Македонски", dir: "ltr", currency: "MKD" },
  "ml-IN": { label: "മലയാളം", dir: "ltr", currency: "INR" },
  "mn-MN": { label: "Монгол", dir: "ltr", currency: "MNT" },
  "mr-IN": { label: "मराठी", dir: "ltr", currency: "INR" },
  "ms-MY": { label: "Bahasa Melayu", dir: "ltr", currency: "MYR" },
  "my-MM": { label: "မြန်မာ", dir: "ltr", currency: "MMK" },
  "nb-NO": { label: "Norsk bokmål", dir: "ltr", currency: "NOK" },
  "ne-NP": { label: "नेपाली", dir: "ltr", currency: "NPR" },
  "nl-BE": { label: "Nederlands (België)", dir: "ltr", currency: "EUR" },
  "nl-NL": { label: "Nederlands (Nederland)", dir: "ltr", currency: "EUR" },
  "pa-IN": { label: "ਪੰਜਾਬੀ", dir: "ltr", currency: "INR" },
  "pl-PL": { label: "Polski", dir: "ltr", currency: "PLN" },
  "pt-BR": { label: "Português (Brasil)", dir: "ltr", currency: "BRL" },
  "pt-PT": { label: "Português (Portugal)", dir: "ltr", currency: "EUR" },
  "ro-RO": { label: "Română", dir: "ltr", currency: "RON" },
  "ru-RU": { label: "Русский", dir: "ltr", currency: "RUB" },
  "si-LK": { label: "සිංහල", dir: "ltr", currency: "LKR" },
  "sk-SK": { label: "Slovenčina", dir: "ltr", currency: "EUR" },
  "sl-SI": { label: "Slovenščina", dir: "ltr", currency: "EUR" },
  "sq-AL": { label: "Shqip", dir: "ltr", currency: "ALL" },
  "sr-RS": { label: "Српски", dir: "ltr", currency: "RSD" },
  "sv-SE": { label: "Svenska", dir: "ltr", currency: "SEK" },
  "sw-TZ": { label: "Kiswahili", dir: "ltr", currency: "TZS" },
  "ta-IN": { label: "தமிழ்", dir: "ltr", currency: "INR" },
  "te-IN": { label: "తెలుగు", dir: "ltr", currency: "INR" },
  "th-TH": { label: "ไทย", dir: "ltr", currency: "THB" },
  "tr-TR": { label: "Türkçe", dir: "ltr", currency: "TRY" },
  "uk-UA": { label: "Українська", dir: "ltr", currency: "UAH" },
  "ur-PK": { label: "اردو", dir: "rtl", currency: "PKR" },
  "uz-UZ": { label: "Oʻzbek", dir: "ltr", currency: "UZS" },
  "vi-VN": { label: "Tiếng Việt", dir: "ltr", currency: "VND" },
  "zh-CN": { label: "中文 (简体)", dir: "ltr", currency: "CNY" },
  "zh-HK": { label: "中文 (香港)", dir: "ltr", currency: "HKD" },
  "zh-TW": { label: "中文 (繁體)", dir: "ltr", currency: "TWD" },
  "zu-ZA": { label: "isiZulu", dir: "ltr", currency: "ZAR" },
};

export const LOCALES = Object.keys(LOCALE_METADATA);

export function useLandingTranslations() {
  const [locale, setLocale] = useState("en-US");
  const [translations, setTranslations] = useState<LandingStrings>(en);
  const [loading, setLoading] = useState(false);
  const cache = useRef<Record<string, LandingStrings>>({ "en-US": en });

  const changeLocale = useCallback(async (newLocale: string) => {
    setLocale(newLocale);
    track("locale_selected", { locale: newLocale });

    // Check cache first
    if (cache.current[newLocale]) {
      setTranslations(cache.current[newLocale]);
      return;
    }

    // English variants use English strings
    if (newLocale.startsWith("en-")) {
      cache.current[newLocale] = en;
      setTranslations(en);
      return;
    }

    setLoading(true);
    try {
      const mod = await import(`./translations/${newLocale}.json`);
      cache.current[newLocale] = mod.default;
      setTranslations(mod.default);
    } catch {
      // Fallback to English if translation file missing
      cache.current[newLocale] = en;
      setTranslations(en);
    }
    setLoading(false);
  }, []);

  // Auto-detect browser language on first visit
  useEffect(() => {
    try {
      const browserLocales = navigator.languages || [navigator.language];
      for (const bl of browserLocales) {
        // Exact match (e.g., "fr-FR" matches "fr-FR")
        if (bl in LOCALE_METADATA) {
          changeLocale(bl);
          return;
        }
        // Language prefix match (e.g., "fr" matches "fr-FR")
        const prefix = bl.split("-")[0].toLowerCase();
        const match = LOCALES.find(l => l.toLowerCase().startsWith(prefix + "-"));
        if (match) {
          changeLocale(match);
          return;
        }
      }
    } catch {
      // SSR or navigator not available — stay on en-US
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dir = LOCALE_METADATA[locale]?.dir || "ltr";

  return { locale, translations, changeLocale, loading, dir };
}
