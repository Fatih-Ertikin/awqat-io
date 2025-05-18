import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Grid, GridCol, Select, Stack, Title } from "@mantine/core";
import { EventCard } from "@/components/molecules/event-card";
import { MOCK_EVENTS } from "@/hooks/use-events";
import {
  findCapital,
  fuzzySearchByName,
  getCountryFilePath,
  readCountryFile,
} from "@/geo-names/geo-names";

import {
  getDateInTimezone,
  getHijriUnicodeLDML,
  getTimeInTimezone,
} from "@/geo-location/datetime";
import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

export default async function EventOverviewPage(props: {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
  }>;
}) {
  const params = await props.params;
  const { country, city, locale } = params;
  const t = await getTranslations("OverviewPage");

  // 1. get users country, capital, current city & timezone
  const countryFilePath = getCountryFilePath(country);

  if (!countryFilePath) {
    // TODO: what here
    throw new Error(`Country file not found for ${country}`);
  }

  const cityData = await readCountryFile(countryFilePath, {
    citiesOnly: true,
    minPopulation: 15000,
  });

  // 2. get users city by fuzzy search
  const match = fuzzySearchByName(city, cityData);

  if (!match) {
    const capital = findCapital(cityData);

    if (!capital) {
      // TODO: what here
      throw new Error(`No capital found for ${country}`);
    }

    const capitalCity = capital.name.toLowerCase();

    redirect({
      href: `/${locale}/${country}/${capitalCity}`,
      locale,
    });
    return;
  }

  const userCity = match;

  const selectableCities = cityData.map((c) => ({
    value: c.id,
    label: c.name.toLowerCase(),
  }));

  // 3. calculate events for today based on the users timezone & date

  const userDateHijri = getDateInTimezone(
    userCity.timezone,
    getHijriUnicodeLDML(locale, locale)
  );

  const userDateLocal = getDateInTimezone(userCity.timezone, locale);

  const userTime = getTimeInTimezone(userCity.timezone, locale);

  return (
    <Grid>
      <GridCol span={6} ta="center">
        <time dateTime={userTime} aria-label={userTime}>
          <Stack gap="xs">
            <Title order={1} fz={125} lh={1}>
              {userTime.split(":")[0]}
            </Title>
            <Title order={1} fz={125} lh={1}>
              {userTime.split(":")[1]}
            </Title>
          </Stack>
        </time>
      </GridCol>
      <GridCol span={6} mt="xs">
        <Stack>
          <Stack gap="xs">
            <Title order={2} fw="lighter" lineClamp={2}>
              {userDateHijri}
            </Title>
            <Title order={3} fz="sm" fw="lighter" lineClamp={2}>
              {userDateLocal}
            </Title>
          </Stack>
          <Select
            label={t("select_city_label")}
            searchable
            placeholder={t("select_city_placeholder")}
            nothingFoundMessage={t("select_city_nothing_found")}
            data={selectableCities}
            value={userCity.id}
          />
        </Stack>
      </GridCol>
      <GridCol span={12}>
        <Title order={3} mb="xs">
          {t("event_overview_title")}
        </Title>
        <Carousel withIndicators>
          {MOCK_EVENTS.map((e, i) => (
            <CarouselSlide key={`event-${i}-${e.title}`}>
              <EventCard event={e} />
            </CarouselSlide>
          ))}
        </Carousel>
      </GridCol>
    </Grid>
  );
}
