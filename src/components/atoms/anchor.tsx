import Link from "next/link";
import { ComponentProps } from "react";

type AnchorProps = ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

export function Anchor(props: AnchorProps) {
  const { children, ...rest } = props;
  return (
    <Link {...rest} className="hover:text-gray-600 dark:hover:text-blue-400">
      {children}
    </Link>
  );
}
