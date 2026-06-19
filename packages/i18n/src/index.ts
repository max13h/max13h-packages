export type Locale = "fr" | "en";

export type TranslationValue = string | { [key: string]: TranslationValue };

export type Translations = Record<Locale, TranslationValue>;

const resolve = (obj: TranslationValue, key: string): string | undefined => {
  const parts = key.split(".")
  let current: TranslationValue = obj
  for (const part of parts) {
    if (typeof current === "string") return undefined
    current = current[part]
    if (current === undefined) return undefined
  }
  return typeof current === "string" ? current : undefined
}

export const createTranslations = (translations: Translations) => {
  return (locale: Locale, key: string): string => {
    return (
      resolve(translations[locale], key) ?? resolve(translations.fr, key) ?? key
    )
  }
}

export const getLocaleFromUrl = (url: { pathname: string }): Locale => {
  const firstSegment = url.pathname.split("/").filter(Boolean)[0]
  if (firstSegment === "en") return "en"
  return "fr"
}
