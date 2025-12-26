import { authClient } from "@/lib/auth/auth-client";
import { s3Client } from "@/lib/storage";
import Image from "next/image";
import Link from "next/link";
import { DeleteVideoButton } from "./delete-video-button";

export async function VideoCard({ video }: { key: string; video: any }) {
  const session = await authClient.getSession();

  if (video.thumbnailKey) {
    const url = s3Client.presign(video.thumbnailKey, {
      bucket: "distra-thumbnails",
    });
    return video.videoVisibility === "PRIVATE" &&
      video.authorId !== session?.data?.user?.id ? (
      <></>
    ) : (
      <div className="space-y-1.5">
        <Link href={`/watch?v=${video.id}`}>
          <div className="aspect-video relative">
            <Image
              alt={video.title}
              src={url ?? ""}
              fill
              className="rounded-md object-cover"
            />
          </div>
        </Link>

        <div className="flex justify-between">
          <div>
            <p className="text-sm font-semibold">{video.title}</p>
            <p className="text-sm">2 views</p>
          </div>
          <div>
            {video.authorId === session?.data?.user.id ? (
              <div>
                <DeleteVideoButton video={video} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col justify-start">
          <Link href={`/watch?v=${video.id}`}>
            <div className="space-y-1.5">
              <div>
                <p className="text-sm font-semibold">{video.title}</p>
                <p className="text-sm">2 views</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex justify-end">
          {video.authorId === session?.data?.user.id ? (
            <div>
              <DeleteVideoButton video={video} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}
