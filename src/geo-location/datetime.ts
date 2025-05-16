/**
 * english hjiri locale for date formatting
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_the_default_locale
 */
export const EN_HIJRI_LOCALE = "en-SA-u-ca-islamic-umalqura" as const; // Hijri locale for English

/**
 * arabic hjiri locale for date formatting
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_the_default_locale
 */
export const AR_HIJRI_LOCALE = "ar-SA-u-ca-islamic-umalqura" as const; // Hijri locale for Arabic

export function getHijriUnicodeLDML(
  locale: string,
  region: string
): Intl.LocalesArgument {
  return `${locale}-${region}-u-ca-islamic-umalqura` as Intl.LocalesArgument;
}
/**
 * Get the current date and time in a specific timezone
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @param timeZone timezone
 * @param locale locale
 * @returns formatted date and time
 */
export function getDateInTimezone(
  timeZone: string,
  locale: Intl.LocalesArgument
): string {
  const now = new Date();

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    dateStyle: "full", // uses locale-specific ordering
  }).format(now);
}

export function getTimeInTimezone(
  timeZone: string,
  locale: Intl.LocalesArgument
): string {
  const now = new Date();

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    timeStyle: "long",
    hour12: false,
  }).format(now);
}
