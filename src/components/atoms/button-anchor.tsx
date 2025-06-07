"use client";

import { Link } from "@/i18n/navigation";
import { ComponentProps } from "react";
import { Button, ButtonProps } from "@mantine/core";

export type ButtonAnchorProps = Omit<ButtonProps, "component" | "href"> &
  ComponentProps<typeof Link>;

export function ButtonAnchor(props: ButtonAnchorProps) {
  const { children, href, ...rest } = props;

  return (
    <Button
      variant="subtle"
      color="gray"
      c="text"
      radius="md"
      fw="normal"
      {...rest}
      component={Link}
      href={href}
    >
      {children}
    </Button>
  );
}
