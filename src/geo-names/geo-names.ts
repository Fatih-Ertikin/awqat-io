/* eslint-disable @typescript-eslint/no-unused-vars */
import countries from "i18n-iso-countries";
import path from "node:path";
import fs from "node:fs";
import { parse as csvParse } from "csv-parse";

const GEONAME_FILES_DIR = "src/geo-names/files";

const FEATURE_CODE_WHITELIST = new Set([
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
const FEATURE_CLASS_WHITELIST = new Set(["P", "A"]);

/**
 * returnes the path of the geoName file for a given country
 * @param countryName ISO 3166-1 name
 */
export function getCountryFilePath(countryName: string): string | null {
  const alpha2Code = countries.getAlpha2Code(countryName, "en");

  if (!alpha2Code) {
    return null;
  }

  const fileName = `${alpha2Code}.txt`;

  const filePath = path.join(process.cwd(), GEONAME_FILES_DIR, fileName);

  // check if the file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  return filePath;
}

type GeoNamesFileRow = [
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

type GeoNamesRecord = {
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

export async function readCountryFile(path: string) {
  const content = fs.readFileSync(path, "utf8");

  const records = csvParse(content, {
    delimiter: "\t", // tab delimited
    skip_empty_lines: true,
    relaxQuotes: true,
  });

  const results: GeoNamesRecord[] = [];

  for await (const row of records) {
    // raw ordered columns of the GeoNames data file
    const [
      id,
      name,
      asciiname,
      alternatenames,
      lat,
      lng,
      featureClass,
      featureCode,
      countryCode,
      cc2,
      admin1,
      admin2,
      admin3,
      admin4,
      population,
      elevation,
      dem,
      timezone,
      modificationDate,
    ] = row as GeoNamesFileRow | string[];

    // filter out non-city records
    if (
      !FEATURE_CLASS_WHITELIST.has(featureClass) ||
      !FEATURE_CODE_WHITELIST.has(featureCode)
    ) {
      continue;
    }

    results.push({
      id,
      name,
      asciiname,
      alternatenames,
      lat,
      lng,
      featureClass,
      featureCode,
      countryCode,
      cc2,
      admin1,
      admin2,
      admin3,
      admin4,
      population,
      elevation,
      dem,
      timezone,
      modificationDate,
    });
  }

  return results;
}
