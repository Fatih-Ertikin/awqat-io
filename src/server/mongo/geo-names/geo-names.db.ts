"server-only";
import mongoClient from "@/server/mongo/mongo-client";
import { CountryInfo } from "./types/country-info.document";
import { Admin1Code } from "./types/admin-1-codes.document";
import { GeoName } from "./types/geo-name.document";

export async function checkifCountryHasCollection(
  iso2: string
): Promise<boolean> {
  const db = mongoClient.db("geo-names");
  const collections = await db
    .listCollections({ name: iso2.toUpperCase() })
    .toArray();
  return collections.length > 0;
}

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
): Promise<{
  unique: GeoName[];
  duplicates: GeoName[];
}> {
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

  const duplicates = await db
    .collection<GeoName>(collectionName)
    .aggregate<GeoName>([
      matchStage,
      {
        $group: {
          _id: { $toLower: "$name" }, // group by lowercased city name
          count: { $sum: 1 },
          docs: { $push: "$$ROOT" }, // collect all docs for that name
        },
      },
      { $match: { count: { $gt: 1 } } }, // only duplicates
      { $unwind: "$docs" },
      { $replaceRoot: { newRoot: "$docs" } },
    ])
    .toArray();

  const unique = await db
    .collection<GeoName>(collectionName)
    .aggregate<GeoName>([
      matchStage,
      {
        $group: {
          _id: { $toLower: "$name" },
          count: { $sum: 1 },
          docs: { $first: "$$ROOT" },
        },
      },
      { $match: { count: 1 } }, // only unique
      { $replaceRoot: { newRoot: "$docs" } },
    ])
    .toArray();

  return {
    unique,
    duplicates,
  };
}
