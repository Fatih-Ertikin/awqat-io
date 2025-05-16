import { Carousel, CarouselSlide } from "@mantine/carousel";
import { Grid, GridCol, Select, Stack, Title } from "@mantine/core";
import { LocalizedDate } from "./components/localized-date";
import { LocalizedTime } from "./components/localized-time";
import { EventCard } from "@/components/molecules/event-card";
import { MOCK_EVENTS } from "@/hooks/use-events";
import { getCountryFilePath, readCountryFile } from "@/geo-names/geo-names";

export default async function EventOverviewPage(props: {
  params: Promise<{
    country: string;
    city: string;
  }>;
}) {
  const params = await props.params;
  const { country, city } = params;

  const filePath = getCountryFilePath(country);

  if (!filePath) {
    return <div>Country not found</div>;
  }

  const rows = await readCountryFile(filePath);

  const uniqueCities = rows
    .map((row) => ({
      value: row.name,
      label: row.name,
    }))
    .filter((row) => row.label.toLowerCase().includes(city.toLowerCase()));

  // 1. get users country, capital, current city & timezone
  // 2. get users current datetime
  // 3. calculate events for today based on the users timezone & date

  return (
    <Grid>
      <GridCol span={6} ta="center">
        <LocalizedTime />
      </GridCol>
      <GridCol span={6} mt="xs">
        <Stack>
          <LocalizedDate />
          <Select
            label="Location"
            searchable
            placeholder="Select your city"
            defaultValue={uniqueCities[0]?.value}
            data={uniqueCities}
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
