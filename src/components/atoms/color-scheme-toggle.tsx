"use client";

import {
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
  MantineColor,
} from "@mantine/core";
import cx from "clsx";
import { Moon, Sun } from "lucide-react";
import classes from "./color-scheme-toggle.module.css";

export type ColorSchemeToggleProps = {
  color?: MantineColor;
};

export function ColorSchemeToggle(props: ColorSchemeToggleProps) {
  const { color } = props;
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  // toggle between light and dark mode
  const toggleTheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
    <ActionIcon onClick={toggleTheme} variant="transparent" color={color}>
      <Sun className={cx(classes.icon, classes.light)} />
      <Moon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
