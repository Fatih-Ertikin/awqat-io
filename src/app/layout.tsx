import "@mantine/core/styles.css";
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
import { Anchor } from "@/components/atoms/anchor";
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
            {/* Header */}
            <header>
              <Group justify="space-between" align="center">
                <Title order={1}>Awqat.io</Title>
                {/* Mobile Menu */}
                <Group justify="space-between" align="center" gap="xs">
                  <ColorSchemeToggle />
                  <MobileMenu />
                </Group>
              </Group>
            </header>

            <main className="flex-1">
              <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
            </main>
          </Container>
        </MantineWithThemeProvider>
      </body>
    </html>
  );
}
