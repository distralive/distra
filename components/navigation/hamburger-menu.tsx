import Link from "next/link";
import { Icon } from "@/components/shared/components/iconify-icon";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import packageJson from "@/package.json";
import { FollowingSection } from "@/components/user/following-section";
import { headers } from "next/headers";

async function getFollowing() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const following = await db.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        id: true,
        following: {
          select: {
            followed: true,
          },
        },
      },
    });

    return following;
  } else {
    return null;
  }
}

export async function HamburgerMenu() {
  const following = await getFollowing();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div
      className="grid grid-rows-menu h-screen w-64 border-r overflow-auto max-sm:hidden"
      style={{ gridTemplateRows: "1fr auto", height: "calc(100vh - 64px)" }}
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col border-b space-y-1.5 p-2">
          <Link href="/">
            <div className="flex items-center p-1.5 space-x-2 w-full hover:bg-accent transition-colors rounded-md">
              <Icon icon="ic:round-home" fontSize={28} />
              <p className="text-sm">Home</p>
            </div>
          </Link>
        </div>
        <FollowingSection session={session} following={following?.following} />
      </div>

      <div className="border-t p-2 mt-auto">
        <p className="text-sm text-foreground/70 font-light">
          distra · v{packageJson.version} ·{" "}
          <Link
            href="https://github.com/distralive/distra"
            className="underline"
          >
            View source code
          </Link>
        </p>
      </div>
    </div>
  );
}
