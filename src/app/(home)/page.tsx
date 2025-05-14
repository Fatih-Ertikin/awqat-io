import {
  EventCard,
  EventCardData,
  MOCK_EVENTS,
} from "@/components/molecules/event-card";
import { Box, Grid, GridCol, Group, Select, Stack, Title } from "@mantine/core";
import { LocalizedTime } from "./components/localized-time";

export default function Home() {
  const TIME = "08:30";

  const events = MOCK_EVENTS;

  return (
    <Grid>
      <GridCol span={6} ta="center">
        <time dateTime={TIME} aria-label={TIME}>
          <Stack gap="xs">
            <Title order={1} fz={125} lh={1}>
              {TIME.split(":")[0]}
            </Title>
            <Title order={1} fz={125} lh={1}>
              {TIME.split(":")[1]}
            </Title>
          </Stack>
        </time>
      </GridCol>
      <GridCol span={6} mt="xs">
        <Stack>
          <LocalizedTime />
          <Select
            label="Location"
            placeholder="Select your city"
            defaultValue="Amsterdam"
            data={["Amsterdam", "Berlin", "London", "New York"]}
          />
        </Stack>
      </GridCol>
      <GridCol span={12}>3</GridCol>
    </Grid>
  );
}
