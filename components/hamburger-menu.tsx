import Link from "next/link";
import { Icon } from "@/components/iconify-icon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

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
      className="w-64 border-r overflow-auto"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="flex flex-col">
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
                    <Icon icon="bx:user" fontSize={28} />
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
    </div>
  );
}
