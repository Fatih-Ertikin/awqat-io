import { ActionIcon } from "@mantine/core";
import type { ReactNode, MouseEventHandler } from "react";

export type MenuButtonProps = {
  icon: ReactNode;
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function MenuButton(props: MenuButtonProps) {
  const { icon, label, onClick } = props;
  return (
    <div className="flex flex-col items-center space-y-1 text-center max-w-[40px]">
      <ActionIcon variant="subtle" size="xl" onClick={onClick}>
        {icon}
      </ActionIcon>
      {label && <label className="text-xs">{label}</label>}
    </div>
  );
}
