import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/iconify-icon";

export function FollowingList({ following }: { following: any }) {
  return (
    <div className="flex flex-col">
      {following?.following.map((following: any) => (
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
  );
}
