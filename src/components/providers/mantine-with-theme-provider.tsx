"use client";

import { MantineProvider } from "@mantine/core";
import { shadcnTheme } from "@/components/theme/shadcn-theme";
import { shadcnCssVariableResolver } from "@/components/theme/css-variable-resolver";
import "@/components/theme/shadcn-theme.css";

export function MantineWithThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider
      theme={shadcnTheme}
      cssVariablesResolver={shadcnCssVariableResolver}
    >
      {children}
    </MantineProvider>
  );
}
