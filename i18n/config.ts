export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const isLocale = (v: string): v is Locale =>
    (LOCALES as readonly string[]).includes(v);
