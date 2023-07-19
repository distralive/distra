import Link from "next/link";
import React from "react";
import type { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto items-center w-full gap-x-6 text-md font-medium cursor-pointer hover:text-foreground transition text-accent-foreground/70 py-1`,
        active && "text-foreground"
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full text-sm">{label}</p>
    </Link>
  );
};
