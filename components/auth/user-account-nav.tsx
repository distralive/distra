"use client";

import type { HTMLAttributes } from "react";
import Link from "next/link";
import type { User } from "better-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth/auth-client";

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email" | "id">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>hello</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background" align="end">
        <div className="flex items-center justify-start p-1.5">
          <div className="flex flex-col leading-none">
            {user.name && <p className="font-medium text-sm">{user.name}</p>}
            {user.email && (
              <p className="w-50 truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/user/${user.id}`}>Your channel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async () => await authClient.signOut()}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
