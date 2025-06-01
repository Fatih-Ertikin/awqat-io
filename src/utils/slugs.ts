/**
 * Normalize path param (slug) by:
 * 1. Converting to lowercase
 * 2. Trimming whitespaces
 * 3. Removing all non-alphanumeric characters except spaces
 * 4. Replacing multiple spaces with a single space
 * 5. Replace spaces with hyphens
 * @param slug - The slug to normalize
 */
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .normalize("NFD") // Decompose accents (e.g., "é" → "é")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^\w\s-]/g, "") // Remove special chars except hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphen
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim leading/trailing hyphens
}

/**
 * localize a country name
 * @param countryCode The countryCode should be in ISO 3166-1 alpha-2 format (e.g., "NL", "US", "DE").
 * @param locale The locale must be a valid BCP 47 language tag (e.g., "en", "fr", "zh-Hant").
 * @returns The localized country name as a string.
 */
export const getLocalizedCountryName = (
  countryCode: string,
  locale: string
) => {
  const regionNames = new Intl.DisplayNames([locale], { type: "region" });
  return regionNames.of(countryCode.toUpperCase());
};

export function getSlug(input: string, deduplicationSuffix?: string): string {
  // Normalize the city name to create a slug
  let slug = normalizeSlug(input);

  // If a deduplication suffix is provided, append it to the slug
  if (deduplicationSuffix) {
    // Normalize the deduplication suffix
    const normalizedSuffix = normalizeSlug(deduplicationSuffix);
    // Append the suffix to the slug
    slug += `-${normalizedSuffix}`;
  }

  return slug;
}
