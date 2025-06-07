"use client";

import { useMantineColorScheme, Switch } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const {
    // see: https://mantine.dev/theming/color-schemes/#color-scheme-value-caveats
    toggleColorScheme,
  } = useMantineColorScheme({
    keepTransitions: true, // keep animations ongoing when toggling between color schemes
  });

  return (
    <Switch
      onChange={toggleColorScheme}
      aria-label="Toggle color scheme"
      size="lg"
      withThumbIndicator={false}
      color="gray"
      onLabel={
        <IconSun size={18} stroke={2} color="var(--mantine-color-yellow-4)" />
      }
      offLabel={
        <IconMoonStars
          size={18}
          stroke={2}
          color="var(--mantine-color-indigo-6)"
        />
      }
    />
  );
}
