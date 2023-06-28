import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";
import Link from "next/link";

export default async function Watch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { v } = searchParams;

  const metadata = await db.video.findUnique({
    where: {
      id: v as string,
    },
    select: {
      id: true,
      title: true,
      description: true,
      author: true,
      authorId: true,
      comments: true,
      createdAt: true,
      thumbnailKey: true,
      videoKey: true,
      reactions: true,
    },
  });

  const command = new GetObjectCommand({
    Bucket: "distra-videos",
    Key: metadata?.videoKey,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 86400 });

  return v ? (
    <div className="p-6 flex flex-col space-y-3">
      <VideoPlayer videoSource={url} />
      <p className="font-semibold text-xl">{metadata?.title}</p>
      <div className="flex items-center">
        <Link href={`/user/${metadata?.author.id}`}>
          <div className="flex space-x-2">
            <Image
              alt="Frolleks' profile picture"
              src={metadata?.author?.image ?? ""}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{metadata?.author?.name}</p>
              <p className="text-sm text-foreground/80">2 followers</p>
            </div>
          </div>
        </Link>
        <Button className="ml-6">Follow</Button>
      </div>
    </div>
  ) : (
    <div>404</div>
  );
}
