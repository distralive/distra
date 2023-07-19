"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { History, Home, Newspaper, ThumbsUp, User2 } from "lucide-react";
import { Search } from "lucide-react";
import { Box } from "@/components/box";
import { SidebarItem } from "@/components/sidebar-item";

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: Newspaper,
        label: "Following",
        active: pathname === "/following",
        href: "/following",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full">
      <div className="hidden md:flex flex-col h-full w-64 m-1.5">
        <Box>
          <div className="flex flex-col gap-y-2 px-4 py-2">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <div className="flex flex-col gap-y-2 px-4 py-2">
            <p className="text-sm font-semibold">Playlists</p>
            <SidebarItem icon={History} label="History" href="/history" />
            <SidebarItem
              icon={ThumbsUp}
              label="Liked videos"
              href="/playlists/liked"
            />
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <div className="flex flex-col gap-y-2 px-4 py-2">
            <p className="text-sm font-semibold">Following</p>
            <SidebarItem icon={User2} label="Frolleks" href="/user/@frolleks" />
          </div>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  );
};
