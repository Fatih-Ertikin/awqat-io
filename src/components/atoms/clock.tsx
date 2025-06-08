"use client";

import { Title } from "@mantine/core";
import { useFormatter, useNow } from "next-intl";

export type ClockProps = {
  /**
   * The time zone to use for formatting the clock.
   * If not provided, the system time zone will be used.
   * Note: when rendering on the server, this will always be the server's time zone.
   */
  timeZone?: string;
};

export function Clock(props: ClockProps) {
  const { timeZone } = props;

  const now = useNow({
    updateInterval: 1000, // Update every second
  });

  const format = useFormatter();

  return (
    <time dateTime={now.toISOString()} suppressHydrationWarning>
      <Title order={1} fw="normal" fz={82}>
        {format.dateTime(now, {
          timeStyle: "medium",
          timeZone: timeZone,
        })}
      </Title>
    </time>
  );
}
