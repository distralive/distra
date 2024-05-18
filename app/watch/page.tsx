import { CommentSection } from "@/components/comment-section";
import { FollowButton } from "@/components/follow-button";
import { VideoPlayer } from "@/components/video-player";
import { VideoReactionButtons } from "@/components/video-reaction-buttons";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { VideoMimeType } from "@vidstack/react";
import { getServerSession } from "next-auth";
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

async function getMetadata(v: any) {
  const metadata = await db.video.findUnique({
    where: {
      id: v as string,
    },
    select: {
      id: true,
      title: true,
      description: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          followers: true,
        },
      },
      authorId: true,
      comments: {
        where: {
          videoId: v as string,
        },
        select: {
          id: true,
          text: true,
          author: true,
          createdAt: true,
          commentId: true,
          replies: true,
          replyToId: true,
          votes: true,
        },
      },
      createdAt: true,
      thumbnailKey: true,
      videoKey: true,
      reactions: true,
      videoVisibility: true,
    },
  });

  return metadata;
}

export default async function Watch({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { v } = searchParams;
  const metadata = await getMetadata(v);
  const session = await getServerSession(authOptions);

  const url =
    metadata?.videoVisibility === "PUBLIC" ||
    metadata?.videoVisibility === "UNLISTED"
      ? `/cdn/video/${metadata?.videoKey}`
      : `/cdn/private-video/${metadata?.videoKey}`;

  let mimeType = await getMimeType("distra-videos", metadata?.videoKey ?? "");

  mimeType === "video/quicktime" ? (mimeType = "video/mp4") : mimeType;

  return v ? (
    <div className="p-6 flex flex-col space-y-3">
      <div className="space-y-3 pb-3 border-b">
        <VideoPlayer videoSource={url} mimeType={mimeType as VideoMimeType} />
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
                  <p className="text-sm text-foreground/80">
                    {metadata?.author.followers.length} followers
                  </p>
                </div>
              </div>
            </Link>
            <div className="ml-6">
              <FollowButton
                userId={metadata?.authorId as string}
                session={session}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <VideoReactionButtons videoId={v as string} />
          </div>
        </div>
      </div>
      <CommentSection session={session} video={metadata} />
    </div>
  ) : (
    <div>404</div>
  );
}
