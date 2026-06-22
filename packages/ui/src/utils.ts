import { type Locale } from "@max13h/i18n";

const dateLocaleMap: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-US",
};

export const formatDate = (date: Date, locale: Locale = "fr") => {
  return new Intl.DateTimeFormat(dateLocaleMap[locale]).format(date);
};
