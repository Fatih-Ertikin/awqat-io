"use client";

import { Container, createTheme, MantineProvider, Select } from "@mantine/core";
import classes from "./mantine-with-theme-provider.module.css";
import cx from "clsx";

import { Poppins } from "next/font/google";
import { IconChevronDown } from "@tabler/icons-react";

const poppins = Poppins({
  subsets: ["latin-ext", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const theme = createTheme({
  fontFamily: poppins.style.fontFamily,
  headings: { fontFamily: poppins.style.fontFamily },
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === "responsive" }),
      }),
    }),
    Select: Select.extend({
      defaultProps: {
        rightSection: <IconChevronDown />,
      },
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
