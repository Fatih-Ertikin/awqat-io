import { defineRouting } from "next-intl/routing";

/**
 * List of supported locales for the application.
 */
export const SUPPORTED_APP_LOCALES = [
  "en",
  "nl",
  // "ar",
  // "tr",
  // "fr",
  // "de",
  // "es",
  // "it",
] as const;

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: SUPPORTED_APP_LOCALES,
  // Used when no locale matches
  defaultLocale: "en",
});
