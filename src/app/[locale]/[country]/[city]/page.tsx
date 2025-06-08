import { Title, Grid, GridCol, Divider } from "@mantine/core";
import { redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { matchSlugs } from "@/server/mongo/countries/countries.collection";
import { getSlug } from "@/utils/slugs";
import { EventCarousel } from "@/components/molecules/event-carousel";
import { FormattedDateTime } from "@/components/atoms/formatted-datetime";

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

  return (
    <Grid align="center">
      <GridCol
        span={{
          base: 12,
          sm: 3,
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
          sm: 6,
        }}
        order={{
          base: 2,
        }}
        ta="center"
      >
        <FormattedDateTime
          component={Title}
          order={1}
          fw="normal"
          fz={82}
          formatOptions={{
            timeStyle: "medium",
            timeZone: city.timeZone,
          }}
          updateInterval={1000} // Update every second
        />
      </GridCol>

      <GridCol
        span={{
          base: 12,
          sm: 3,
        }}
        order={{
          base: 4,
          sm: 3,
        }}
        ta="end"
      >
        <FormattedDateTime
          component={Title}
          order={3}
          formatOptions={{
            dateStyle: "long",
            calendar: "islamic",
            timeZone: city.timeZone,
          }}
        />
        <FormattedDateTime
          component={Title}
          order={4}
          fw="lighter"
          formatOptions={{
            dateStyle: "full",
            timeZone: city.timeZone,
          }}
        />
      </GridCol>

      <GridCol
        span={12}
        order={{
          base: 3,
        }}
      >
        <Divider my="lg" />
        <EventCarousel timeZone={city.timeZone} />
        <Divider my="lg" hiddenFrom="sm" />
      </GridCol>
    </Grid>
  );
}
