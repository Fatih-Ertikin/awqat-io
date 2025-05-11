"use client";

import { Container, createTheme, MantineProvider } from "@mantine/core";
import classes from "./mantine-with-theme-provider.module.css";
import cx from "clsx";

const theme = createTheme({
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === "responsive" }),
      }),
    }),
  },
});

export function MantineWithThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
