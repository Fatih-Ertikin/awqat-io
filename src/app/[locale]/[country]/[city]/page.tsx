import { Stack, Title, Text } from "@mantine/core";
import { getFormatter, getNow, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { matchSlugs } from "@/server/mongo/countries/countries.collection";
import { getSlug } from "@/utils/slugs";

export default async function EventOverviewPage(props: {
  params: Promise<{
    locale: string;
    country: string;
    city: string;
  }>;
}) {
  const format = await getFormatter();
  const serverDateTime = await getNow();

  const params = await props.params;

  const translate = await getTranslations("Pages.PrayerTimesPage");

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

  // Convert the server date to the requested city's timezone
  const formattedCityDateTime = format.dateTime(serverDateTime, {
    timeZone: city.timeZone,
  });

  return (
    <Stack>
      <Title order={1}>
        {translate("title", {
          city: city.names[locale] || city.fallbackName,
          country: country.names[locale] || country.fallbackName,
          date: formattedCityDateTime,
        })}
      </Title>

      <Title order={2}>{translate("PrayerTimes.title")}</Title>

      <Title order={3}>{translate("PrayerTimes.Fajr.prayer_name")}</Title>
      <Text>
        {translate("PrayerTimes.Fajr.time", {
          time: format.dateTime(new Date(), {
            timeZone: city.timeZone,
            minute: "2-digit",
            hour: "2-digit",
          }),
        })}
      </Text>

      <Title order={3}>{translate("PrayerTimes.Dhuhr.prayer_name")}</Title>
      <Text>
        {translate("PrayerTimes.Dhuhr.time", {
          time: format.dateTime(new Date(), {
            timeZone: city.timeZone,
            minute: "2-digit",
            hour: "2-digit",
          }),
        })}
      </Text>

      <Title order={3}>{translate("PrayerTimes.Asr.prayer_name")}</Title>
      <Text>
        {translate("PrayerTimes.Asr.time", {
          time: format.dateTime(new Date(), {
            timeZone: city.timeZone,
            minute: "2-digit",
            hour: "2-digit",
          }),
        })}
      </Text>

      <Title order={3}>{translate("PrayerTimes.Maghrib.prayer_name")}</Title>
      <Text>
        {translate("PrayerTimes.Maghrib.time", {
          time: format.dateTime(new Date(), {
            timeZone: city.timeZone,
            minute: "2-digit",
            hour: "2-digit",
          }),
        })}
      </Text>

      <Title order={3}>{translate("PrayerTimes.Isha.prayer_name")}</Title>
      <Text>
        {translate("PrayerTimes.Isha.time", {
          time: format.dateTime(new Date(), {
            timeZone: city.timeZone,
            minute: "2-digit",
            hour: "2-digit",
          }),
        })}
      </Text>
    </Stack>
  );
}
