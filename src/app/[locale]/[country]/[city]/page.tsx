import { Title, Grid, GridCol, Box, Divider } from "@mantine/core";
import { getFormatter, getNow } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { matchSlugs } from "@/server/mongo/countries/countries.collection";
import { getSlug } from "@/utils/slugs";
import { EventCarousel } from "@/components/molecules/event-carousel";
import { Clock } from "@/components/atoms/clock";

export default async function EventOverviewPage(props: {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
  }>;
}) {
  const params = await props.params;

  // 1. use slug parameters to find the country and city
  const match = await matchSlugs(getSlug(params.country), getSlug(params.city));

  if (match.result === "no-match") {
    return notFound();
  }

  if (match.result === "country-only") {
    // If we only found the country, redirect to the country's capital page
    const countrySlug = getSlug(match.country.fallbackName);
    const capitalSlug = getSlug(match.country.capitalFallbackName);
    return redirect({
      href: `/${countrySlug}/${capitalSlug}`,
      locale: params.locale,
    });
  }

  const format = await getFormatter();
  const now = await getNow();

  const { country, city } = match;
  const locale = params.locale;

  return (
    <Grid align="center">
      <GridCol
        span={{
          base: 12,
          sm: 4,
        }}
        ta="start"
      >
        <Title order={1} fw="normal">
          {city.names[locale] || city.fallbackName},
        </Title>
        <Title order={1} fw="normal">
          {country.names[locale] || country.fallbackName}
        </Title>
        <Title order={2}>
          {format.dateTime(now, {
            timeZone: city.timeZone,
            dateStyle: "long",
            calendar: "islamic",
          })}
        </Title>
        <Title order={3} fw="lighter">
          {format.dateTime(now, {
            timeZone: city.timeZone,
            dateStyle: "medium",
          })}
        </Title>
      </GridCol>

      <GridCol
        span={{
          base: 12,
          sm: 4,
        }}
        visibleFrom="sm"
        ta="center"
      >
        <Clock />
      </GridCol>

      <GridCol
        span={{
          base: 12,
          sm: 4,
        }}
        visibleFrom="sm"
        ta="end"
      >
        <Box>TODO: something here</Box>
      </GridCol>

      <GridCol span={12}>
        <Divider my="lg" />
        <EventCarousel />
      </GridCol>
    </Grid>
  );
}
