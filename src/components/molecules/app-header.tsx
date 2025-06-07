"use client";

import { ActionIcon, Anchor, Drawer, Group, Stack, Title } from "@mantine/core";
import { ColorSchemeToggle } from "../atoms/color-scheme-toggle";
import { LocaleSelect } from "../atoms/locale-select";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ButtonAnchor } from "../atoms/button-anchor";
import { IconX, IconMenu2 } from "@tabler/icons-react";

export function AppHeader() {
  const [drawerIsOpen, { toggle, close }] = useDisclosure();
  const translate = useTranslations("Global");

  const renderRoutes = () => {
    return (
      <>
        <ButtonAnchor onClick={close} href="/">
          {translate("Routes.home")}
        </ButtonAnchor>
        <ButtonAnchor onClick={close} href="/calculation-method">
          {translate("Routes.calculation_method")}
        </ButtonAnchor>
        <ButtonAnchor onClick={close} href="/about">
          {translate("Routes.about")}
        </ButtonAnchor>
      </>
    );
  };

  return (
    <Group justify="space-between" mb="xl" wrap="nowrap">
      <Anchor component={Link} href="/" underline="never" c="text">
        <Title order={1} fw={200}>
          {translate("app_name")}
        </Title>
      </Anchor>

      {/* Desktop Header */}
      <Group justify="space-between" gap="xl" visibleFrom="sm">
        {renderRoutes()}
        <Group gap="xs">
          <ColorSchemeToggle />
          <LocaleSelect />
        </Group>
      </Group>

      {/* Mobile Header + Burger Menu */}
      <Group justify="space-between" gap="xs" hiddenFrom="sm" wrap="nowrap">
        <ColorSchemeToggle />
        <LocaleSelect />
        <ActionIcon
          variant="transparent"
          c="text"
          aria-label="toggle main menu"
          onClick={toggle}
        >
          {drawerIsOpen ? <IconX /> : <IconMenu2 />}
        </ActionIcon>

        <Drawer
          opened={drawerIsOpen}
          position="right"
          onClose={close}
          closeButtonProps={{
            icon: <IconX />,
          }}
        >
          <Stack>{renderRoutes()}</Stack>
        </Drawer>
      </Group>
    </Group>
  );
}
