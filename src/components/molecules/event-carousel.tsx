"use client";

import { Carousel, CarouselSlide } from "@mantine/carousel";
import { EmblaCarouselType } from "embla-carousel";
import { EventCard } from "./event-card";
import { useState } from "react";
import { Button, Group, Stack } from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { useNow, useTranslations } from "next-intl";
import dayjs from "dayjs";

// TODO: replace with actual calculated prayer times
const EVENTS = [
  {
    title: "Salaat Al Fajr",
    // fajr @ 3:49
    start: dayjs().startOf("day").add(3, "hour").add(49, "minute").toDate(),
    // shurooq @ 5:19
    end: dayjs().startOf("day").add(5, "hour").add(19, "minute").toDate(),
  },
  {
    title: "Salaat Al Dhuhr",
    // dhuhr @ 13:38
    start: dayjs().startOf("day").add(13, "hour").add(38, "minute").toDate(),
    // Asr @ 18:01
    end: dayjs().startOf("day").add(18, "hour").add(1, "minute").toDate(),
  },
  {
    title: "Salaat Al Asr",
    // asr @ 18:01
    start: dayjs().startOf("day").add(18, "hour").add(1, "minute").toDate(),
    // end @ 19:30
    end: dayjs().startOf("day").add(19, "hour").add(30, "minute").toDate(),
  },
  {
    title: "Salaat Al Maghrib",
    // maghrib @ 22:03
    start: dayjs().startOf("day").add(22, "hour").add(3, "minute").toDate(),
    // Isha @ 23:27
    end: dayjs().startOf("day").add(23, "hour").add(27, "minute").toDate(),
  },
  {
    title: "Salaat Al Isha",
    // isha @ 23:27
    start: dayjs().startOf("day").add(23, "hour").add(27, "minute").toDate(),
    // Midnight @ 00:31
    end: dayjs().startOf("day").add(24, "hour").add(31, "minute").toDate(),
  },
];

export function EventCarousel() {
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const translate = useTranslations("Components.EventCarousel");

  const handleClickPeviousButton = () => {
    if (!embla) return;
    embla.scrollPrev();
  };

  const handleClickNextButton = () => {
    if (!embla) return;
    embla.scrollNext();
  };

  const now = useNow({
    updateInterval: 1000 * 60, // Update value every minute
  });

  const startIndex = (() => {
    const ongoing = EVENTS.findIndex(
      (event) => event.start <= now && now <= event.end
    );

    if (ongoing !== -1) {
      return ongoing;
    }

    const nextUp = EVENTS.findIndex((event) => now < event.start);

    if (nextUp !== -1) {
      return nextUp;
    }

    // If no ongoing or upcoming event, return the first event
    return 0;
  })();

  return (
    <Stack>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Button
          variant="outline"
          color="light"
          radius="md"
          leftSection={<IconArrowLeft />}
          onClick={handleClickPeviousButton}
        >
          {translate("prev_btn_label")}
        </Button>
        <Button
          variant="outline"
          color="light"
          radius="md"
          rightSection={<IconArrowRight />}
          onClick={handleClickNextButton}
        >
          {translate("next_btn_label")}
        </Button>
      </Group>
      <Carousel
        getEmblaApi={setEmbla}
        height={300}
        slideSize={{ base: "100%", sm: "33%" }}
        slideGap={{ base: "lg", sm: "md" }}
        controlsOffset="x"
        withControls={false}
        emblaOptions={{
          align: "center",
          slidesToScroll: 1,
          loop: true,
          startIndex: startIndex,
        }}
      >
        {EVENTS.map((event, index) => (
          <CarouselSlide key={index}>
            <EventCard
              now={now}
              event={{
                localName: event.title,
                start: event.start,
                end: event.end,
              }}
            />
          </CarouselSlide>
        ))}
      </Carousel>
    </Stack>
  );
}
