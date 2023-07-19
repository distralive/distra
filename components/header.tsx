"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import distraLogo from "@/public/distra.svg";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Menu, Search } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { ModeToggle } from "./mode-toggle";
import { UserAccountNav } from "./user-account-nav";

interface HeaderProps {
  session: any;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ session, className }) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b dark:from-indigo-800 from-indigo-300 p-4`,
        className
      )}
    >
      <div className="flex w-full mb-4 items-center justify-between">
        <div className="flex md:hidden gap-x-2 items-center">
          <Link href="/">
            <Image alt="distra's logo" src={distraLogo} width={38} />
          </Link>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <Search className="text-black" size={20} />
          </button>
        </div>
        <div className="flex max-md:hidden items-center gap-3">
          <button className="rounded-md p-1.5 hover:bg-indigo-600/50 transition">
            <Menu />
          </button>
          <Link href="/">
            <div className="flex items-center gap-x-1.5">
              <Image alt="distra's logo" src={distraLogo} width={28} />
              <p className="font-display text-lg">distra</p>
            </div>
          </Link>
        </div>
        <div className="flex max-md:hidden items-center gap-x-1.5">
          <Input
            placeholder="Search"
            className="bg-background/60 w-96 focus-visible:ring-0 transition-shadow"
          />
          <Button size="icon">
            <Search size={18} />
          </Button>
        </div>
        <div className="flex items-center gap-x-1.5">
          <ModeToggle />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/sign-in">
              <Button>Log in</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
