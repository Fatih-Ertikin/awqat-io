"use client";

import { Title } from "@mantine/core";
import { useFormatter, useNow } from "next-intl";

export function Clock() {
  const now = useNow({
    updateInterval: 1000, // Update every second
  });

  const format = useFormatter();

  return (
    <time dateTime={now.toISOString()} suppressHydrationWarning>
      <Title order={1} fw="normal" fz={82}>
        {format.dateTime(now, {
          timeStyle: "medium",
        })}
      </Title>
    </time>
  );
}
