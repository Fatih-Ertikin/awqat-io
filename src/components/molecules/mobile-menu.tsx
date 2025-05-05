"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ActionIcon } from "@mantine/core";
import { Anchor } from "../atoms/anchor";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionIcon
        variant="subtle"
        color="gray"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </ActionIcon>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full p-4 border-b z-40"
          >
            <nav className="flex flex-col space-y-4">
              <Anchor href="#">calculation method</Anchor>
              <Anchor href="#">about</Anchor>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
