import { Icon } from "@/components/iconify-icon";
import Link from "next/link";

export function SettingsButtons() {
  return (
    <div>
      <p className="text-xl font-semibold border-b w-64 max-sm:w-8 py-1.5">
        Settings
      </p>
      <div className="border-b py-2">
        <p className="text-sm font-semibold mb-1.5 text-accent-foreground">
          User
        </p>
        <Link href="/settings/profile">
          <button className="flex items-center gap-1.5 p-1.5 font-medium hover:bg-accent transition-colors w-full rounded-md text-sm">
            <Icon icon="bx:user" fontSize={20} />
            <p className="max-sm:hidden">Profile</p>
          </button>
        </Link>
        <Link href="/settings/account">
          <button className="flex items-center gap-1.5 p-1.5 font-medium hover:bg-accent transition-colors w-full rounded-md text-sm">
            <Icon icon="ic:baseline-settings" fontSize={20} />
            <p className="max-sm:hidden">Account</p>
          </button>
        </Link>
        <Link href="/settings/appearance">
          <button className="flex items-center gap-1.5 p-1.5 font-medium hover:bg-accent transition-colors w-full rounded-md text-sm">
            <Icon icon="bxs:paint-roll" fontSize={20} />
            <p className="max-sm:hidden">Appearance</p>
          </button>
        </Link>
      </div>
      <div className="border-b py-2">
        <p className="text-sm font-semibold mb-1.5 text-accent-foreground">
          Billing
        </p>
        <Link href="/settings/billing">
          <button className="flex items-center gap-1.5 p-1.5 font-medium hover:bg-accent transition-colors w-full rounded-md text-sm">
            <Icon icon="iconamoon:star-fill" fontSize={20} />
            <p className="max-sm:hidden">Premium</p>
          </button>
        </Link>
      </div>
      <div className="mt-2">
        <button className="flex items-center gap-1.5 p-1.5 font-medium hover:bg-accent transition-colors w-full rounded-md text-sm">
          <Icon icon="bx:log-out" fontSize={20} />
          <p className="max-sm:hidden">Log Out</p>
        </button>
      </div>
    </div>
  );
}
