"use client";

import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

// Defined in src/app/globals.css
const GLOBAL_CSS_CLASS_DARK = "dark";
const GLOBAL_CSS_CLASS_LIGHT = "light";

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={GLOBAL_CSS_CLASS_LIGHT} stroke={1.5} />
      <IconMoon className={GLOBAL_CSS_CLASS_DARK} stroke={1.5} />
    </ActionIcon>
  );
}
