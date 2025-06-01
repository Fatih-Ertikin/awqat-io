import { WithId } from "mongodb";

export interface CountryInfo extends WithId<unknown> {
  geoNameId: number;
  iso: string;
  iso3: string;
  isoNumeric: string;
  fips: string;
  country: string;
  capital: string;
  areaSqKm: string;
  population: string;
  continent: string;
  tld: string;
  currencyCode: string;
  currencyName: string;
  phone: string;
  postalCodeFormat: string;
  postalCodeRegex: string;
  languages: string;
  neighbours: string;
  equivalentFipsCode: string;
}
