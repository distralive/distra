import { Session } from "next-auth";
import { FollowingList } from "@/components/following-list";

export function FollowingSection({
  session,
  following,
}: {
  session: Session | null;
  following: any;
}) {
  return (
    <div className="flex flex-col border-b space-y-1.5 p-4">
      <p className="font-semibold">Following</p>
      {session ? (
        (following?.following.length as number) > 0 ? (
          <FollowingList following={following} />
        ) : (
          <div>
            <p className="text-sm">You haven&apos;t followed any users yet!</p>
          </div>
        )
      ) : (
        <div>
          <p className="text-sm">Log in to follow users!</p>
        </div>
      )}
    </div>
  );
}
