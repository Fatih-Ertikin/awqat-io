"use client";

import {
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIconProps,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { MenuButton } from "./menu-button";

// Defined in src/app/globals.css
const GLOBAL_CSS_CLASS_DARK = "dark";
const GLOBAL_CSS_CLASS_LIGHT = "light";

export type ColorSchemeToggleProps = {
  iconSize?: ActionIconProps["size"];
  label?: string;
  stroke?: number;
};

export function ColorSchemeToggle(props: ColorSchemeToggleProps) {
  const { iconSize, label, stroke } = props;
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <MenuButton
      label={label}
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      aria-label="color-scheme-toggle-button"
      icon={
        <>
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
        </>
      }
    />
  );
}
