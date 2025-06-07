import { Group, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { ColorSchemeToggle } from "../atoms/color-scheme-toggle";
import { LocaleSelect } from "../atoms/locale-select";
import { MobileMenu } from "../organisms/mobile-menu";
import { Anchor } from "../atoms/anchor";
import { ButtonAnchor } from "../atoms/button-anchor";

export async function AppHeader() {
  const t = await getTranslations("Global");

  return (
    <Group justify="space-between" mb="xl" wrap="nowrap">
      <Anchor href="/" underline="never" color={undefined}>
        <Title order={1}>{t("app_name")}</Title>
      </Anchor>

      {/* Desktop Menu */}
      <Group justify="space-between" gap="xl" visibleFrom="sm">
        <ButtonAnchor href="/">{t("Menu.home")}</ButtonAnchor>
        <ButtonAnchor href="/calculation-method">
          {t("Menu.calculation_method")}
        </ButtonAnchor>
        <ButtonAnchor href="/about">{t("Menu.about")}</ButtonAnchor>
        <Group gap="xs">
          <ColorSchemeToggle />
          <LocaleSelect />
        </Group>
      </Group>

      {/* Mobile Menu */}
      <Group justify="space-between" gap="xs" hiddenFrom="sm" wrap="nowrap">
        <ColorSchemeToggle />
        <LocaleSelect />
        <MobileMenu />
      </Group>
    </Group>
  );
}
