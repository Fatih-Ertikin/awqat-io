"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { Anchor } from "../atoms/anchor";
import { ActionIcon, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function MobileMenu() {
  const [drawerIsOpen, { toggle, close }] = useDisclosure();

  return (
    <>
      <ActionIcon
        variant="transparent"
        color="gray"
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
