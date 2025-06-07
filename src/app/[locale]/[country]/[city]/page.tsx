import { Title, Grid, GridCol, Divider } from "@mantine/core";
import { redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { matchSlugs } from "@/server/mongo/countries/countries.collection";
import { getSlug } from "@/utils/slugs";
import { EventCarousel } from "@/components/molecules/event-carousel";
import { Clock } from "@/components/atoms/clock";
import { getFormatter, getNow } from "next-intl/server";

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

  const { country, city } = match;
  const locale = params.locale;

  const now = await getNow();
  const format = await getFormatter();

  return (
    <Grid align="center">
      <GridCol
        span={{
          base: 12,
          sm: 4,
        }}
        order={{
          base: 1,
        }}
        mb={{
          base: "xs",
          sm: 0,
        }}
        ta="start"
      >
        <Title order={1} fw="normal">
          {city.names[locale] || city.fallbackName},
        </Title>
        <Title order={1} fw="normal">
          {country.names[locale] || country.fallbackName}
        </Title>
      </GridCol>

      <GridCol
        span={{
          base: 12,
          sm: 4,
        }}
        order={{
          base: 2,
        }}
        ta="center"
      >
        <Clock />
      </GridCol>

      <GridCol
        span={{
          base: 12,
          sm: 4,
        }}
        order={{
          base: 4,
          sm: 3,
        }}
        ta="end"
      >
        <Title order={3} mb="md">
          {format.dateTime(now, {
            dateStyle: "long",
            calendar: "islamic",
          })}
        </Title>
        <Title order={4} fw="lighter">
          {format.dateTime(now, {
            dateStyle: "full",
          })}
        </Title>
      </GridCol>

      <GridCol
        span={12}
        order={{
          base: 3,
        }}
      >
        <Divider my="lg" />
        <EventCarousel />
        <Divider my="lg" hiddenFrom="sm" />
      </GridCol>
    </Grid>
  );
}
