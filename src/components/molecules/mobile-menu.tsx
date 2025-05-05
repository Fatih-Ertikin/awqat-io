"use client";

import { IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Anchor } from "../atoms/anchor";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </Button>

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
              <Anchor href="#">home</Anchor>
              <Anchor href="#">calculation method</Anchor>
              <Anchor href="#">about</Anchor>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
