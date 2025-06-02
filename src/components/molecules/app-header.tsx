import { Group, Title } from "@mantine/core";
import { getTranslations } from "next-intl/server";
import { ColorSchemeToggle } from "../atoms/color-scheme-toggle";
import { LocaleSelect } from "../atoms/locale-select";
import { MobileMenu } from "../organisms/mobile-menu";
import { MenuItems } from "./menu-items";

export async function AppHeader() {
  const t = await getTranslations("Global");

  return (
    <Group justify="space-between" mb="xl">
      <Title order={1}>{t("app_name")}</Title>

      {/* Desktop Menu */}
      <Group justify="space-between" gap="xl" visibleFrom="sm">
        <MenuItems />
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
