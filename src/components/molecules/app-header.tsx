import { Group, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { ColorSchemeToggle } from "../atoms/color-scheme-toggle";
import { LocaleSelect } from "../atoms/locale-select";
import { MobileMenu } from "../organisms/mobile-menu";
import { Anchor } from "../atoms/anchor";

export async function AppHeader() {
  const t = await getTranslations("Global");

  return (
    <Group justify="space-between" mb="xl">
      <Title order={1}>{t("app_name")}</Title>

      {/* Desktop Menu */}
      <Group justify="space-between" gap="xl" visibleFrom="sm">
        <Anchor href="/">{t("Menu.home")}</Anchor>
        <Anchor href="/calculation-method">
          {t("Menu.calculation_method")}
        </Anchor>
        <Anchor href="/about">{t("Menu.about")}</Anchor>
        <Group gap="xs">
          <ColorSchemeToggle />
          <LocaleSelect />
        </Group>
      </Group>

      {/* Mobile Menu */}
      <Group justify="space-between" gap="xs" hiddenFrom="sm">
        <ColorSchemeToggle />
        <LocaleSelect />
        <MobileMenu />
      </Group>
    </Group>
  );
}
