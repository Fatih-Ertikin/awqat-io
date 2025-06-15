import { WithId } from "mongodb";
import { GeoJsonPoint } from "./geo-json";

export interface Masjid extends WithId<unknown> {
  /**
   * Map of masjid names in different locales
   */
  names: Record<string, string>;
  /**
   * Fallback name for the masjid, always available when no localized name is available.
   */
  fallbackName: string;
  /**
   * GeoJSON Point type for storing location data.
   * Used for geospatial queries and indexing.
   * @see https://www.mongodb.com/docs/manual/geospatial-queries/#geospatial-data
   */
  location: GeoJsonPoint;
  address: {
    /**
     *  ISO 3166-1 alpha-2 country code, e.g., "US" for United States.
     * @see https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
     * @example "US" for The United States
     */
    country: string;
    /**
     * First level administrative division, e.g., state or province.
     * This is a string to allow for different formats across countries.
     * @see https://en.wikipedia.org/wiki/List_of_administrative_divisions_by_country
     * @example "IL" for Illinois in the United States
     * @example "Flevoland" for Flevoland in the Netherlands
     */
    state: string;
    /**
     *  City or locality name.
     *  @example "Springfield"
     *  @example "Amsterdam"
     */
    city: string;
    /**
     * Full address line, e.g., "123 Main St, Springfield, IL 62704".
     */
    streetName: string;
    /**
     * Full postal code, .e.g., "12345" or "12345-6789".
     */
    postalCode: string;
  };
}
