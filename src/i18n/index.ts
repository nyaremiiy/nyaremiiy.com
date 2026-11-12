import uk from "./uk.json";
import en from "./en.json";

export type Locale = "uk" | "en";
export type Dictionary = typeof uk;

// en.json must have exactly the same shape as uk.json.
const dictionaries: Record<Locale, Dictionary> = { uk, en: en satisfies Dictionary };

export const locales: Locale[] = ["uk", "en"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export const localePath: Record<Locale, string> = { uk: "/", en: "/en" };
export const htmlLang: Record<Locale, string> = { uk: "uk", en: "en" };
