import { Stack, Title, Text, List, ListItem } from "@mantine/core";
import {
  findCapital,
  fuzzySearchCityByName,
  getCountryFilePath,
  readCountryFile,
} from "@/server/geo-names/geo-names";

import { getFormatter, getNow, getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { notFound } from "next/navigation";

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
  const { country, city, locale } = params;

  const translate = await getTranslations("OverviewPage");

  const countriesTranslations = await getTranslations("Countries");

  // 1. get users country, capital, current city & timezone
  const countryDataFilePath = getCountryFilePath(country);

  if (!countryDataFilePath) {
    notFound();
  }

  const countryCities = await readCountryFile(countryDataFilePath, {
    citiesOnly: true,
    minPopulation: 15000,
  });

  // 2. get users city by fuzzy search
  const matchedCity = fuzzySearchCityByName(city, countryCities);

  if (!matchedCity) {
    const capital = findCapital(countryCities);

    if (!capital) {
      notFound();
    }

    const capitalCity = capital.name.toLowerCase();

    return redirect({
      href: `/${country}/${capitalCity}`,
      locale,
    });
  }

  // const selectableCities = countryCities.map((c) => ({
  //   value: c.id,
  //   label: c.name.toLowerCase(),
  // }));

  // TODO: calculate events for today based on the users timezone & date

  // Convert the server date to the requested city's timezone
  const cityDateTime = format.dateTime(serverDateTime, {
    timeZone: matchedCity.timezone,
  });

  return (
    <Stack>
      <Title order={1}>
        {translate("title", {
          city: city,
          country: countriesTranslations(country),
          date: cityDateTime,
        })}
      </Title>
      <Text>{translate("Description.text")}</Text>
      <List>
        <ListItem>
          {translate("Description.List.morning_evening_dhikr")}
        </ListItem>
        <ListItem>{translate("Description.List.last_hour_of_friday")}</ListItem>
        <ListItem>{translate("Description.List.last_third_of_night")}</ListItem>
        <ListItem>{translate("Description.List.and_more")}</ListItem>
      </List>

      <Title order={2}>{translate("PrayerTimes.title")}</Title>

      <Title order={3}>{translate("PrayerTimes.Fajr.prayer_name")}</Title>
      <Text>
        {translate("PrayerTimes.Fajr.time", {
          time: format.dateTime(new Date(), {
            timeZone: matchedCity.timezone,
            minute: "2-digit",
            hour: "2-digit",
          }),
        })}
      </Text>

      <Title order={3}>{translate("PrayerTimes.Dhuhr.prayer_name")}</Title>
      <Title order={3}>{translate("PrayerTimes.Asr.prayer_name")}</Title>
      <Title order={3}>{translate("PrayerTimes.Maghrib.prayer_name")}</Title>
      <Title order={3}>{translate("PrayerTimes.Isha.prayer_name")}</Title>
    </Stack>
  );
}
