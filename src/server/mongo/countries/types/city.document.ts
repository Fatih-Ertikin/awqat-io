import { GeoJsonPoint } from "./geo-json.document";

export interface City {
  slug: string;
  fallbackName: string;
  names: Record<string, string>;
  timeZone: string;
  alternateNames: string[];
  location: GeoJsonPoint;
}
