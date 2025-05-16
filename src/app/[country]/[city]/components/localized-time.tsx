"use client";

import { useLocalizedDateTime } from "@/hooks/use-localized-datetime";
import { Stack, Title } from "@mantine/core";

export function LocalizedTime() {
  const { time } = useLocalizedDateTime();

  return (
    <time dateTime={time} aria-label={time}>
      <Stack gap="xs">
        <Title order={1} fz={125} lh={1}>
          {time.split(":")[0]}
        </Title>
        <Title order={1} fz={125} lh={1}>
          {time.split(":")[1]}
        </Title>
      </Stack>
    </time>
  );
}
