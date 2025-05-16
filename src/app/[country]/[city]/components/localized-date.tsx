"use client";

import { useLocalizedDateTime } from "@/hooks/use-localized-datetime";
import { Stack, Title } from "@mantine/core";

export function LocalizedDate() {
  const { hijri, browser: system } = useLocalizedDateTime();

  return (
    <Stack gap="xs">
      <Title order={2} fw="lighter" lineClamp={2}>
        {hijri}
      </Title>
      <Title order={3} fz="sm" fw="lighter" lineClamp={2}>
        {system}
      </Title>
    </Stack>
  );
}
