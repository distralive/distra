"use client";

import Link from "next/link";
import { Icon } from "./iconify-icon";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BottomHamburgerMenuItem } from "./bottom-hamburger-menu-item";

export function BottomHamburgerMenu() {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: "ic:round-home",
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: "mdi:cog",
        label: "Home",
        active: pathname.startsWith("/settings"),
        href: "/settings",
      },
    ],
    [pathname]
  );

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex sm:hidden border-t items-center justify-center">
        {routes.map((item) => (
          <BottomHamburgerMenuItem key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
