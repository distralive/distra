import Link from "next/link";
import type { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "@/components/shared/components/iconify-icon";

interface BottomHamburgerMenuItemProps {
  icon: string;
  active?: boolean;
  href: string;
}

export const BottomHamburgerMenuItem: FC<BottomHamburgerMenuItemProps> = ({
  icon,
  active,
  href,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-12 items-center w-full hover:bg-accent justify-center text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && "text-white"
      )}
    >
      <Icon icon={icon} fontSize={24} />
    </Link>
  );
};
