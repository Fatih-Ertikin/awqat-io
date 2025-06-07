import { Badge, Card, CardSection, Stack, Text, Title } from "@mantine/core";
import { useFormatter } from "next-intl";

export type Event = {
  localName: string;
  start: Date;
  end?: Date;
};

type EventCardProps = {
  now: Date;
  event: Event;
};

export function EventCard(props: EventCardProps) {
  const { event, now } = props;
  const format = useFormatter();

  const { localName, start, end } = event;

  const isOngoing = now >= start && (end ? now <= end : true);

  const isPassed = now > (end ?? start);

  return (
    <Card
      p="lg"
      radius="lg"
      c={isPassed ? "dimmed" : undefined}
      withBorder={isOngoing}
    >
      <CardSection ta="end" h="1.5rem">
        <Badge
          variant="gradient"
          gradient={{ from: "red", to: "orange", deg: 90 }}
          size="lg"
        >
          DEV DATA NOT REAL
        </Badge>
      </CardSection>
      <Stack ta="center">
        <Title order={2} fw="normal">
          {localName}
        </Title>
        <Title order={1}>
          {format.dateTime(start, {
            timeStyle: "short",
          })}
        </Title>
        {end && (
          <Text size="sm" c="dimmed">
            until{" "}
            {format.dateTime(end, {
              timeStyle: "short",
            })}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
