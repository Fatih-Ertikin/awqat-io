"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { ActionIcon, Drawer, MantineColor, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Anchor } from "../atoms/anchor";
import { useTranslations } from "next-intl";

export type MobileMenuProps = {
  iconColor?: MantineColor;
  iconStrokeWidth?: number;
};

export function MobileMenu(props: MobileMenuProps) {
  const { iconColor = "gray", iconStrokeWidth = 1.75 } = props;
  const [drawerIsOpen, { toggle, close }] = useDisclosure();
  const t = useTranslations("Global.Menu");

  return (
    <>
      <ActionIcon
        variant="transparent"
        color={iconColor}
        aria-label="toggle main menu"
        onClick={toggle}
      >
        {drawerIsOpen ? (
          <IconX strokeWidth={iconStrokeWidth} />
        ) : (
          <IconMenu2 strokeWidth={iconStrokeWidth} />
        )}
      </ActionIcon>

      <Drawer
        opened={drawerIsOpen}
        position="right"
        onClose={close}
        closeButtonProps={{
          icon: <IconX size={24} color="gray" />,
        }}
      >
        <Stack>
          <Anchor href="/" onClick={close}>
            {t("home")}
          </Anchor>
          <Anchor href="/calculation-method" onClick={close}>
            {t("calculation_method")}
          </Anchor>
          <Anchor href="/about" onClick={close}>
            {t("about")}
          </Anchor>
        </Stack>
      </Drawer>
    </>
  );
}
