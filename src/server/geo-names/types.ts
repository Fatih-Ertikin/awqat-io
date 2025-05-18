export type GeoNamesFileRow = [
  id: string,
  name: string,
  asciiname: string,
  alternatenames: string,
  lat: string,
  lng: string,
  featureClass: string,
  featureCode: string,
  countryCode: string,
  cc2: string,
  admin1: string,
  admin2: string,
  admin3: string,
  admin4: string,
  population: string,
  elevation: string,
  dem: string,
  timezone: string,
  modificationDate: string
];

export const CITY_FEATURE_CODES = new Set([
  "PPL",
  "PPLA",
  "PPLA2",
  "PPLA3",
  "PPLC",
  "PPLG",
  "PPLL",
  "PPLS",
  "PPLX",
]);
export const CITY_FEATURE_CLASSES = new Set(["P"]);

export type GeoNamesFilterOptions = {
  minPopulation?: number;
  citiesOnly?: boolean;
};

export type GeoNamesRecord = {
  id: string;
  name: string;
  asciiname: string;
  alternatenames: string;
  lat: string;
  lng: string;
  featureClass: string;
  featureCode: string;
  countryCode: string;
  cc2: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
  population: string;
  elevation: string;
  dem: string;
  timezone: string;
  modificationDate: string;
};
