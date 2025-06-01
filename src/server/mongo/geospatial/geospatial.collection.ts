import { City } from "../countries/types/city.document";
import { Country } from "../countries/types/country.document";
import mongoClient from "../mongo-client";
import { Geospatial } from "./types/geospatial.document";

export async function generateGeoSpatialCollection() {
  const db = mongoClient.db("awqat-io");
  const countriesCollection = db.collection<Country>("countries");

  /**
   * MongoDb geospatial queries require that the the top-level documents have a valid geoJSON object.
   * Because we store cities seperatly for each country in a nested array ("cities"), we cannot directly use geospatial queries
   * We need to first unwind (flatten) all cities into a seperate document to work with geospatial queries.
   */
  const geoSpatialCollectionName = "geospatial";

  await countriesCollection
    .aggregate([
      // Step 1: Unwind all cities array from each country document
      {
        $unwind: "$cities",
      },
      // Step 2: Reshape each city with relevant country info for redirecting
      {
        $project: {
          _id: 0, // exclude original _id and let MongoDB generate a new one
          countrySlug: "$slug",
          citySlug: "$cities.slug",
          location: "$cities.location",
        },
      },
      // Step 3: Output to a new collection
      {
        $out: geoSpatialCollectionName,
      },
    ])
    .toArray();

  /**
   * MongoDB geospatial queries require the `2dsphere` index to be created on the geoJSON field (location).
   */
  const geoSpatialCollection = db.collection<City>(geoSpatialCollectionName);
  await geoSpatialCollection.createIndex({ location: "2dsphere" });
}

export async function findNearestGeoData(
  latitude: number,
  longitude: number
): Promise<Geospatial | null> {
  const db = mongoClient.db("awqat-io");

  const geoSpatialCollection = db.collection<Geospatial>("geospatial");

  const city = await geoSpatialCollection.findOne<Geospatial>({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 30000, // 30 km max distance
      },
    },
  });

  return city;
}
