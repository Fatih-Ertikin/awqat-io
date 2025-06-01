"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { Anchor } from "@/components/atoms/anchor";
import { ActionIcon, Drawer, MantineColor, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export type MobileMenuProps = {
  iconColor?: MantineColor;
};

export function MobileMenu(props: MobileMenuProps) {
  const { iconColor } = props;
  const [drawerIsOpen, { toggle, close }] = useDisclosure();

  return (
    <>
      <ActionIcon
        variant="transparent"
        color={iconColor}
        aria-label="toggle main menu"
        onClick={toggle}
      >
        {drawerIsOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
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
            Home
          </Anchor>
          <Anchor href="/calculation-method" onClick={close}>
            Calculation method
          </Anchor>
          <Anchor href="/about" onClick={close}>
            About
          </Anchor>
        </Stack>
      </Drawer>
    </>
  );
}
