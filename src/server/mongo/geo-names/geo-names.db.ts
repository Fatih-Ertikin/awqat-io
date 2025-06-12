"server-only";
import mongoClient from "@/server/mongo/mongo-client";
import { CountryInfo } from "./types/country-info.document";
import { Admin1Code } from "./types/admin-1-codes.document";
import { GeoName } from "./types/geo-name.document";

export function findCountryInfo(iso2: string): Promise<CountryInfo | null> {
  const db = mongoClient.db("geo-names");

  return db
    .collection<CountryInfo>("country-info")
    .findOne({ iso: iso2.toUpperCase() });
}

export function findAdmin1Codes(iso2: string): Promise<Admin1Code[]> {
  const db = mongoClient.db("geo-names");

  return db
    .collection<Admin1Code>("admin-1-codes")
    .aggregate<Admin1Code>([
      {
        $match: {
          adminCode: {
            // db contains records like "NL.16", so we need to match the first two characters
            $regex: `^${iso2.toUpperCase()}.`,
          },
        },
      },
    ])
    .toArray();
}

export async function findGeoNames(
  iso2: string,
  filter?: {
    minPopulation?: number;
    featureClass?: string;
  }
): Promise<GeoName[]> {
  const db = mongoClient.db("geo-names");
  const collectionName = iso2.toUpperCase();

  const matchStage = {
    $match: {
      ...(filter?.minPopulation
        ? { population: { $gt: filter.minPopulation } }
        : undefined),
      ...(filter?.featureClass
        ? { featureClass: filter.featureClass }
        : undefined),
    },
  };

  const geoNamesCollection = db.collection<GeoName>(collectionName);

  const geoNames = await geoNamesCollection
    .aggregate<GeoName>([matchStage])
    .toArray();

  return geoNames;
}
