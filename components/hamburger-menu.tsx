import Link from "next/link";
import { Icon } from "@/components/iconify-icon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Image from "next/image";
import packageJson from "@/package.json";

async function getFollowing() {
  const session = await getServerSession(authOptions);

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
}

export async function HamburgerMenu() {
  const following = await getFollowing();

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

        <div className="flex flex-col border-b space-y-1.5 p-4">
          <p className="font-semibold">Following</p>
          {(following?.following.length as number) > 0 ? (
            <div className="flex flex-col">
              {following?.following.map((following) => (
                <Link
                  href={`/user/${following.followed.id}`}
                  key={following.followed.id}
                >
                  <div className="flex items-center py-1.5 space-x-2 w-full hover:bg-accent transition-colors rounded-md">
                    {following.followed.image ? (
                      <Image
                        alt={`${following.followed.name}'s profile picture`}
                        src={following.followed.image}
                        width={28}
                        height={28}
                      />
                    ) : (
                      <Icon icon="bx:user" fontSize={28} />
                    )}
                    <p className="text-sm">{following.followed.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-sm">
                You haven&apos;t followed any users yet!
              </p>
            </div>
          )}
        </div>
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
