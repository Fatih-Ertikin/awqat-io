"use client";

import { Button, ButtonProps } from "@mantine/core";
import { Link } from "@/i18n/navigation";

type ButtonAnchorProps = {
  href: string;
  children?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
} & Omit<ButtonProps, "href" | "component">;

export function ButtonAnchor(props: ButtonAnchorProps) {
  const { href, children, ...rest } = props;

  return (
    <Button
      variant="outline"
      color="light"
      radius="md"
      {...rest}
      href={href}
      component={Link}
      fw="normal"
    >
      {children}
    </Button>
  );
}
