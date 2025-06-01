import { WithId } from "mongodb";

export interface Geospatial extends WithId<unknown> {
  countrySlug: string;
  citySlug: string;
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
}
