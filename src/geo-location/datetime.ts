export function getHijriUnicodeLDML(
  locale: string,
  region: string
): Intl.LocalesArgument {
  return `${locale}-${region}-u-ca-islamic-umalqura` as Intl.LocalesArgument;
}

/**
 * Get the current date in a specific timezone & locale.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @param timeZone timezone
 * @param locale locale
 * @returns formatted date
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

/**
 * Get the current time in a specific timezone & locale.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 * @param timeZone timezone
 * @param locale locale
 * @returns formatted time
 */
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
