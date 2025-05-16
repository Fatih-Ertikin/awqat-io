import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  Group,
  mantineHtmlProps,
  Title,
} from "@mantine/core";
import type { Metadata } from "next";
import { MobileMenu } from "@/components/molecules/mobile-menu";

import { ColorSchemeToggle } from "@/components/atoms/color-scheme-toggle";
import { MantineWithThemeProvider } from "@/components/atoms/mantine-with-theme-provider";

export const metadata: Metadata = {
  title: "Awqat.io",
  description: "Islamic Prayer & Important Times & Dates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineWithThemeProvider>
          <Container size="responsive">
            <header>
              <Group justify="space-between" align="center" mb="lg">
                <Title order={1}>Awqat.io</Title>
                {/* Mobile Menu */}
                <Group
                  justify="space-between"
                  align="center"
                  gap="xs"
                  hiddenFrom="sm"
                >
                  <ColorSchemeToggle />
                  <MobileMenu />
                </Group>
              </Group>
            </header>

            <main>
              <Box>{children}</Box>
            </main>
          </Container>
        </MantineWithThemeProvider>
      </body>
    </html>
  );
}
