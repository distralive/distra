"use client";

import Link from "next/link";
import { Icon } from "./iconify-icon";
import { usePathname } from "next/navigation";

export function BottomHamburgerMenu() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 w-full">
      <div className="flex sm:hidden border-t p-4 items-center justify-between">
        <Link href="/">
          {pathname === "/" ? (
            <Icon
              icon="ic:round-home"
              fontSize={36}
              className="bg-accent rounded-full p-2"
            />
          ) : (
            <Icon
              icon="ic:round-home"
              fontSize={36}
              className="bg-background rounded-full p-2"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
