import mongoClient from "@/server/mongo/mongo-client";
import { Country } from "./types/country.document";
import { City } from "./types/city.document";

export async function insertCountryData(data: Country) {
  const db = mongoClient.db("awqat-io");

  const countriesCollection = db.collection<Country>("countries");

  await countriesCollection.createIndex({ slug: 1 }, { unique: true });
  await countriesCollection.createIndex(
    { "cities.slug": 1 },
    {
      unique: true,
      partialFilterExpression: { "cities.slug": { $exists: true } },
    }
  );

  await countriesCollection.insertOne(data);
}

export async function dropCountriesCollection() {
  const db = mongoClient.db("awqat-io");

  const countriesCollection = db.collection<Country>("countries");

  await countriesCollection.drop();
}

type SlugMatchResult =
  | {
      result: "full-match";
      country: Omit<Country, "cities">;
      city: City;
    }
  | {
      result: "country-only";
      country: Omit<Country, "cities">;
    }
  | {
      result: "no-match";
      country: null;
      city: null;
    };

export async function matchSlugs(
  country: string,
  city: string
): Promise<SlugMatchResult> {
  const db = mongoClient.db("awqat-io");
  const countriesCollection = db.collection<Country>("countries");

  const countryRecord = await countriesCollection.findOne<
    Omit<Country, "cities">
  >(
    {
      slug: country,
    },
    { projection: { cities: 0 } }
  );

  if (!countryRecord) {
    return { result: "no-match", country: null, city: null };
  }

  const cityRecord = await countriesCollection
    .aggregate<{ city: City }>([
      { $match: { "cities.slug": city } },
      {
        $project: {
          city: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$cities",
                  as: "c",
                  cond: { $eq: ["$$c.slug", city] },
                },
              },
              0,
            ],
          },
          _id: 0,
        },
      },
    ])
    .next();

  if (!cityRecord?.city) {
    return {
      result: "country-only",
      country: countryRecord,
    };
  }

  return {
    result: "full-match",
    country: countryRecord,
    city: cityRecord.city,
  };
}

export async function findCountries(): Promise<Omit<Country, "cities">[]> {
  const db = mongoClient.db("awqat-io");

  const countriesCollection = db.collection<Country>("countries");

  const countries = await countriesCollection
    .find({}, { projection: { _id: 0, cities: 0 } })
    .toArray();

  return countries;
}

export async function findCountryCitiesBySlug(
  countrySlug: string
): Promise<City[]> {
  const db = mongoClient.db("awqat-io");

  const countriesCollection = db.collection<Country>("countries");

  const country = await countriesCollection.findOne<Country>(
    { slug: countrySlug },
    { projection: { cities: 1, _id: 0 } }
  );

  if (!country) {
    return [];
  }

  return country.cities || [];
}
