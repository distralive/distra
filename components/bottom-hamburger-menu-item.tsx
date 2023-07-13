import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Icon } from "./iconify-icon";

interface BottomHamburgerMenuItemProps {
  icon: string;
  active?: boolean;
  href: string;
}

export const BottomHamburgerMenuItem: React.FC<
  BottomHamburgerMenuItemProps
> = ({ icon, active, href }) => {
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
