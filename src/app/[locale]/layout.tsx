import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  mantineHtmlProps,
} from "@mantine/core";
import type { Metadata } from "next";
import { MantineWithThemeProvider } from "@/components/atoms/mantine-with-theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Notifications } from "@mantine/notifications";
import { AppHeader } from "@/components/molecules/app-header";

export const metadata: Metadata = {
  title: "Awqat.io",
  description: "Islamic Prayer & Important Times & Dates",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <MantineWithThemeProvider>
            <Notifications />
            <Container size="responsive">
              <header>
                <AppHeader />
              </header>
              <main>
                <Box>{children}</Box>
              </main>
            </Container>
          </MantineWithThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
