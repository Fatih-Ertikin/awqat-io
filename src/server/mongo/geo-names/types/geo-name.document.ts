import { WithId, Document } from "mongodb";

export interface GeoName extends WithId<Document> {
  geoNameId: string;
  name: string;
  asciiName: string;
  alternateNames: string;
  latitude: number;
  longitude: number;
  featureClass: string;
  featureCode: string;
  countryCode: string;
  cc2: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  population: number;
  elevation: string;
  dem: number;
  timeZone: string;
  modificationDate: string;
}
