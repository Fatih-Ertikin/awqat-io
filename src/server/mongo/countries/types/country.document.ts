import { WithId } from "mongodb";
import { City } from "./city.document";

export interface Country extends WithId<unknown> {
  slug: string; // ISO3 code
  fallbackName: string; // Fallback name if no translations are available
  names: Record<string, string>; // key: iso2 code | value: name in that language
  iso2: string; // ISO2 code
  iso3: string; // ISO3 code
  capitalFallbackName: string; // Fallback name for the capital if no translations are available
  capitalName: Record<string, string>; // key: iso2 code | value: name in that language
  cities: City[];
}
