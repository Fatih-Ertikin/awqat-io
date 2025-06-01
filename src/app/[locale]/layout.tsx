import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  Group,
  mantineHtmlProps,
  Title,
} from "@mantine/core";
import type { Metadata } from "next";
import { MobileMenu } from "@/components/organisms/mobile-menu";
import { ColorSchemeToggle } from "@/components/atoms/color-scheme-toggle";
import { MantineWithThemeProvider } from "@/components/atoms/mantine-with-theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { Notifications } from "@mantine/notifications";
import { LocaleSelect } from "@/components/atoms/locale-select";

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

  const t = await getTranslations("Global");

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
                <Group justify="space-between" align="center" mb="lg">
                  <Title order={1}>{t("app_name")}</Title>
                  {/* Mobile Menu */}
                  <Group
                    justify="space-between"
                    align="center"
                    gap="xs"
                    hiddenFrom="sm"
                  >
                    <LocaleSelect />
                    <ColorSchemeToggle />
                    <MobileMenu />
                  </Group>

                  {/* Desktop Menu */}
                  <Group
                    justify="space-between"
                    align="center"
                    gap="xs"
                    visibleFrom="sm"
                  >
                    <LocaleSelect />
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
