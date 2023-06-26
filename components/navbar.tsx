import { getServerSession } from "next-auth";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Plus } from "lucide-react";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-0 z-10 bg-background border-b border-border py-2 h-16">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <div className="justify-start flex">
          <Link href="/">
            <p className="font-display">distra</p>
          </Link>
        </div>
        <div className="justify-end flex items-center space-x-1.5">
          <Link
            href="/upload"
            className="hover:bg-white/10 transition-all p-1.5 rounded-full"
          >
            <Plus />
          </Link>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/api/auth/signin" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
