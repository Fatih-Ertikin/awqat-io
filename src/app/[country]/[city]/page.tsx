import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Grid, GridCol, Select, Stack, Title } from "@mantine/core";
import { EventCard } from "@/components/molecules/event-card";
import { MOCK_EVENTS } from "@/hooks/use-events";
import { getCountryFilePath, readCountryFile } from "@/geo-names/geo-names";
import Fuse from "fuse.js";
import { redirect } from "next/navigation";
import {
  AR_HIJRI_LOCALE,
  EN_HIJRI_LOCALE,
  FALLBACK_LOCALE,
  getDateInTimezone,
  getTimeInTimezone,
} from "@/geo-location/datetime";

export default async function EventOverviewPage(props: {
  params: Promise<{
    country: string;
    city: string;
  }>;
}) {
  const params = await props.params;
  const { country, city } = params;

  // 1. get users country, capital, current city & timezone
  const countryFile = getCountryFilePath(country);

  if (!countryFile) {
    // TODO: what here
    throw new Error(`Country file not found for ${country}`);
  }

  const cityData = await readCountryFile(countryFile);

  // 2. get users city by fuzzy search
  const fuse = new Fuse(cityData, {
    threshold: 0.1,
    keys: ["name", "asciiname", "alternatenames"],
    includeScore: true,
  });

  const result = fuse.search(city);

  // 3. get the best match for the city
  const sortedByScore = result.sort((a, b) => {
    if (a.score && b.score) {
      return a.score - b.score;
    }
    return 0;
  });

  const bestMatch = sortedByScore[0];

  if (!bestMatch) {
    const capital = cityData.find((c) => c.featureCode === "PPLC");

    if (!capital) {
      // TODO: what here
      throw new Error(`No capital found for ${country}`);
    }

    const capitalCity = capital.name.toLowerCase();

    redirect(`/${country}/${capitalCity}`);
  }

  const userCity = bestMatch.item;

  const selectableCities = cityData.map((c) => ({
    value: c.id,
    label: c.name.toLowerCase(),
  }));

  // 3. calculate events for today based on the users timezone & date

  const userDateHijri = getDateInTimezone(userCity.timezone, EN_HIJRI_LOCALE);

  const userDateLocal = getDateInTimezone(userCity.timezone, FALLBACK_LOCALE); // TODO: use the users locale

  const userTime = getTimeInTimezone(userCity.timezone, FALLBACK_LOCALE);

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
            label="Location"
            searchable
            placeholder="Select your city"
            data={selectableCities}
            value={userCity.id}
          />
        </Stack>
      </GridCol>
      <GridCol span={12}>
        <Title order={3} mb="xs">
          Up next:
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
