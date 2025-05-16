import { Link } from "@/i18n/navigation";
import { ComponentProps } from "react";
import {
  Anchor as MantineAnchor,
  AnchorProps as MantineAnchorProps,
} from "@mantine/core";

type AnchorProps = {
  children: React.ReactNode;
  href: string;
} & Omit<MantineAnchorProps, "component" | "href"> &
  ComponentProps<typeof Link>;

export function Anchor(props: AnchorProps) {
  const { children, href, ...rest } = props;

  return (
    <MantineAnchor {...rest} component={Link} href={href}>
      {children}
    </MantineAnchor>
  );
}
