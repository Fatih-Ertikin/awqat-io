import { GeoLocationRequestButton } from "@/components/atoms/geo-location-request-button";
import { LocationSelectionForm } from "@/components/organisms/location-selection-form";
import { redirect } from "@/i18n/navigation";
import {
  findCountries,
  findCountryCitiesBySlug,
} from "@/server/mongo/countries/countries.collection";
import { findNearestGeoData } from "@/server/mongo/geospatial/geospatial.collection";
import { Center, Divider, Stack, Text, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";

export default async function Home(props: {
  params: Promise<{
    locale: string;
  }>;
}) {
  const params = await props.params;
  const { locale } = params;

  const translate = await getTranslations("Pages.HomePage");

  const countries = await findCountries();

  const handleGeoLocationConfirm = async (
    latitude: number,
    longitude: number
  ) => {
    "use server";
    // 1. use latitude and longitude to find the nearest country and city
    const nearest = await findNearestGeoData(latitude, longitude);

    // 1. TODO: show toaster or something
    if (!nearest) {
      return;
    }

    // 3. redirect to /[locale]/[countrySlug]/[citySlug]
    redirect({
      href: `/${nearest.countrySlug}/${nearest.citySlug}`,
      locale: locale,
    });
  };

  const getCountryCities = async (countrySlug: string) => {
    "use server";
    const result = await findCountryCitiesBySlug(countrySlug);

    return result.map((city) => ({
      slug: city.slug,
      localizedName: city.names[locale] || city.fallbackName,
    }));
  };

  return (
    <Center>
      <Stack maw="400px">
        <Title order={1} ta="center" px="xl">
          {translate("title")}
        </Title>
        <GeoLocationRequestButton onConfirm={handleGeoLocationConfirm} />
        <Divider
          label={
            <Text size="lg" c="dimmed">
              {translate("divider_label")}
            </Text>
          }
        />
        <Title order={2}>{translate("search_manually_title")}</Title>
        <LocationSelectionForm
          countries={countries.map((country) => ({
            slug: country.slug,
            localizedName: country.names[locale] || country.fallbackName,
          }))}
          getCountryCities={getCountryCities}
        />
      </Stack>
    </Center>
  );
}
