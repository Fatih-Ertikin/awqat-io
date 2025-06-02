"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { ActionIcon, Drawer, MantineColor, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MenuItems } from "../molecules/menu-items";

export type MobileMenuProps = {
  iconColor?: MantineColor;
  iconStrokeWidth?: number;
};

export function MobileMenu(props: MobileMenuProps) {
  const { iconColor = "gray", iconStrokeWidth = 1.75 } = props;
  const [drawerIsOpen, { toggle, close }] = useDisclosure();

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
          <MenuItems />
        </Stack>
      </Drawer>
    </>
  );
}
