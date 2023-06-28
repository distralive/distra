import { VideoPlayer } from "@/components/video-player";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

  const videoOptions = {
    sources: [
      {
        src: url,
        type: "video/mp4",
      },
    ],
  };

  return v ? <VideoPlayer options={videoOptions} /> : <div>404</div>;
}
