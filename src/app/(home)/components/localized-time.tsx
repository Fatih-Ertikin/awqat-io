"use client";

import { useLocalizedSystemTime } from "@/hooks/use-localized-system-time";
import { Stack, Title } from "@mantine/core";

export function LocalizedTime() {
  const { hijri, system } = useLocalizedSystemTime();

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
