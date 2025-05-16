import { Card, Group, Text, CardSection, Stack } from "@mantine/core";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

enum EventType {
  SALAH,
  MORNING_DHIKR,
  EVENING_DHIKR,
  JUMMAH_SALAH,
  LAST_THIRD_OF_THE_NIGHT,
}

type Event = {
  title: string;
  type: EventType;
  description: string;
  time: {
    start: Date;
    durationMs: number;
  };
};

const EventTypeCaptions: Record<EventType, string> = {
  [EventType.SALAH]: "Obligatory Salah",
  [EventType.MORNING_DHIKR]: "Morning Dhikr",
  [EventType.EVENING_DHIKR]: "Evening Dhikr",
  [EventType.JUMMAH_SALAH]: "Jummah Salah",
  [EventType.LAST_THIRD_OF_THE_NIGHT]: "Last Third of the Night",
};

export type EventCardProps = {
  event: Event;
};

export function EventCard(props: EventCardProps) {
  const { event } = props;

  const { title, time, id, description, type } = event;

  const { start, durationMs } = time;

  // Calculate in how many minutes the event starts
  const now = dayjs();
  const startTime = dayjs(start);
  const duration = dayjs.duration(durationMs);
  const startsIn = startTime.diff(now, "minute");
  const startsInHours = Math.floor(startsIn / 60);

  const startsInLabel =
    startsIn > 60 ? `In ${startsInHours} hours` : `In ${startsIn} minutes`;

  return (
    <Card withBorder shadow="sm" radius="md">
      <CardSection inheritPadding py="xs">
        <Stack gap="xs">
          <Group justify="space-between">
            <Text fw={500}>{title}</Text>
            <Text fw={500}>{startsInLabel}</Text>
          </Group>
          <Text size="sm" c="dimmed">
            {EventTypeCaptions[type]}
          </Text>
        </Stack>
      </CardSection>

      <Text mt="sm" c="dimmed" size="sm">
        since last visit, review them to select which one should be added to
        your gallery
      </Text>

      <CardSection inheritPadding mt="sm">
        helo
      </CardSection>

      <CardSection inheritPadding mt="sm" pb="md"></CardSection>
    </Card>
  );
}
