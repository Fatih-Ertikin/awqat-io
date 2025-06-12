import { SUPPORTED_APP_LOCALES } from "@/i18n/routing";
import {
  dropCountriesCollection,
  insertCountryData,
} from "@/server/mongo/countries/countries.collection";
import { City } from "@/server/mongo/countries/types/city.document";
import { Country } from "@/server/mongo/countries/types/country.document";
import {
  findAdmin1Codes,
  findCountryInfo,
  findGeoNames,
} from "@/server/mongo/geo-names/geo-names.db";
import { generateGeoSpatialCollection } from "@/server/mongo/geospatial/geospatial.collection";
import { getSlug } from "@/utils/slugs";
import { ObjectId } from "mongodb";

export async function GET() {
  console.debug("Starting geo-data generation...");

  await dropCountriesCollection();

  // 1. Loop through all supported locales (iso 2 codes)
  for (const locale of SUPPORTED_APP_LOCALES) {
    // 2. For each locale, query the country info
    const countryInfo = await findCountryInfo(locale);

    if (!countryInfo) {
      console.warn(`No country info found for locale: ${locale}, skippping...`);
      continue;
    }

    console.debug(
      `Processing locale: ${locale}, country: ${countryInfo.country}`
    );

    // 3. For each country, fetch the geoNames (cities, locations, etc) and the countries administrative (admin-1) divisions (states, provinces, etc)
    const admin1Codes = await findAdmin1Codes(locale);
    console.debug(
      `Found ${admin1Codes.length} admin-1 codes for locale: ${locale}`
    );

    const geoNames = await findGeoNames(locale, {
      featureClass: "P", // Geonames "P" feature class represents populated places (cities, towns, etc)
      minPopulation: 7500,
    });

    console.debug(`Found ${geoNames.length} geo-names locale: ${locale}`);

    // 4. for country generate a country record
    const record: Country = {
      _id: new ObjectId(),
      slug: getSlug(countryInfo.country),
      fallbackName: countryInfo.country, // geoNames returns the country name in English
      names: SUPPORTED_APP_LOCALES.reduce(
        (acc, locale) => ({
          ...acc,
          [locale]: new Intl.DisplayNames([locale], { type: "region" }).of(
            countryInfo.iso.toUpperCase()
          ),
        }),
        {}
      ),
      capitalFallbackName: countryInfo.capital,
      capitalName: {
        en: countryInfo.capital, // geoNames returns the capital name in English
      },
      iso2: countryInfo.iso,
      iso3: countryInfo.iso3,
      cities: geoNames.map(
        (city): City => ({
          names: {
            en: city.name, // geoNames returns the city name in the English
          },
          fallbackName: city.name,
          slug: getSlug(city.name),
          location: {
            type: "Point",
            coordinates: [city.longitude, city.latitude], // GeoJSON format: [longitude, latitude]
          },
          timeZone: city.timeZone,
          alternateNames: city.alternateNames
            .split(",")
            .map((name) => name.trim()),
        })
      ),
    };

    // 5. bulk insert the country record into the database
    await insertCountryData(record);
  }

  // 6. Unwind all cities into a seperate collection for geo-spatial queries
  await generateGeoSpatialCollection();

  return new Response("countries database updated sucessfully", {
    status: 200,
  });
}
