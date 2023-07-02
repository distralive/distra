import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/video-player";
import { VideoReactionButtons } from "@/components/video-reaction-buttons";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";
import Link from "next/link";

async function getMimeType(bucket: string, key: string) {
  const command = new HeadObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    const response = await s3Client.send(command);
    return response.ContentType;
  } catch (error) {
    console.error("Error", error);
  }
}

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

  let mimeType = await getMimeType("distra-videos", metadata?.videoKey ?? "");

  mimeType === "video/quicktime" ? (mimeType = "video/mp4") : mimeType;

  return v ? (
    <div className="p-6 flex flex-col space-y-3">
      <VideoPlayer videoSource={url} mimeType={mimeType as string} />
      <p className="font-semibold text-xl">{metadata?.title}</p>
      <div className="flex items-center justify-between">
        <div className="flex justify-start">
          <Link href={`/user/${metadata?.author.id}`}>
            <div className="flex space-x-2">
              <Image
                alt="Frolleks' profile picture"
                src={metadata?.author?.image ?? ""}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex flex-col justify-start">
                <p className="font-semibold">{metadata?.author?.name}</p>
                <p className="text-sm text-foreground/80">2 followers</p>
              </div>
            </div>
          </Link>
          <Button className="ml-6">Follow</Button>
        </div>
        <div className="flex justify-end">
          <VideoReactionButtons videoId={v as string} />
        </div>
      </div>
    </div>
  ) : (
    <div>404</div>
  );
}
