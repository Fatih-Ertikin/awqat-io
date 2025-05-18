"server-only";

import countries from "i18n-iso-countries";
import path from "node:path";
import fs from "node:fs";
import { parse as csvParse } from "csv-parse";
import Fuse from "fuse.js";
import {
  CITY_FEATURE_CLASSES,
  CITY_FEATURE_CODES,
  GeoNamesFileRow,
  GeoNamesFilterOptions,
  GeoNamesRecord,
} from "./types";

const GEONAME_FILES_DIR = "src/server/geo-names/files";

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

export async function readCountryFile(
  path: string,
  options?: GeoNamesFilterOptions
) {
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

    if (options?.minPopulation) {
      const populationNumber = parseInt(population, 10);

      if (isNaN(populationNumber) || populationNumber < options.minPopulation) {
        continue;
      }
    }

    if (options?.citiesOnly) {
      if (
        !CITY_FEATURE_CLASSES.has(featureClass) ||
        !CITY_FEATURE_CODES.has(featureCode)
      ) {
        continue;
      }
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

export function fuzzySearchCityByName(
  input: string,
  records: GeoNamesRecord[]
): GeoNamesRecord | null {
  const fuse = new Fuse(records, {
    threshold: 0.1,
    keys: ["name", "asciiname", "alternatenames"],
    includeScore: true,
  });

  const result = fuse.search(input);

  // 3. get the best match for the city
  const sortedByScore = result.sort((a, b) => {
    if (a.score && b.score) {
      return a.score - b.score;
    }
    return 0;
  });

  const bestMatch = sortedByScore[0];

  if (!bestMatch) {
    return null;
  }

  return bestMatch.item;
}

export function findCapital(records: GeoNamesRecord[]): GeoNamesRecord | null {
  const capital = records.find((c) => c.featureCode === "PPLC");

  return capital || null;
}
