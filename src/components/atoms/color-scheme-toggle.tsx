"use client";

import {
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIconProps,
  ActionIcon,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

// Defined in src/app/globals.css
const GLOBAL_CSS_CLASS_DARK = "dark";
const GLOBAL_CSS_CLASS_LIGHT = "light";

export type ColorSchemeToggleProps = {
  iconSize?: ActionIconProps["size"];
  stroke?: number;
};

export function ColorSchemeToggle(props: ColorSchemeToggleProps) {
  const { iconSize, stroke } = props;
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      aria-label="color-scheme-toggle-button"
    >
      <IconSun
        className={GLOBAL_CSS_CLASS_LIGHT}
        size={iconSize}
        stroke={stroke}
      />
      <IconMoon
        className={GLOBAL_CSS_CLASS_DARK}
        size={iconSize}
        stroke={stroke}
      />
    </ActionIcon>
  );
}
