import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { SettingsSidebarNav } from "@/components/settings-sidebar-nav";

import distraLogo from "@/public/distra.svg";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="h-fit bg-gradient-to-b dark:from-indigo-800 from-indigo-300 p-6">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex items-center gap-x-1.5">
              <Image alt="distra's logo" src={distraLogo} width={28} />
              <p className="font-display text-lg max-md:hidden">distra</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SettingsSidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
