import Image from "next/image";
import Link from "next/link";
import { FollowButton } from "@/components/follow-button";

export function ChannelCard({ id, data }: { id: string; data: any }) {
  return (
    <div className="border-b px-12 py-4 flex justify-between">
      <div className="flex items-center gap-6 justify-start">
        <Image
          src={data.image ?? ""}
          width={110}
          height={110}
          alt={`${data.name}'s profile picture`}
          className="rounded-full"
        />
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <p className="font-semibold text-2xl">{data.name}</p>
            <p>0 followers • {data.videos.length} videos</p>
          </div>
          <Link href={`/user/${id}/about`}>
            <div className="flex space-x-1 text-foreground/70">
              <p>hello</p>
              <p className="text-foreground/70">{"->"}</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <FollowButton userId={id} />
      </div>
    </div>
  );
}
