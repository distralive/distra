import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;

  const video = await db.video.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      authorId: true,
      comments: true,
      createdAt: true,
      reactions: true,
      thumbnailKey: true,
      videoKey: true,
    },
  });

  if (video) {
    return new Response(JSON.stringify(video), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ error: "Video not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const id = params.slug;
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const video = await db.video.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          authorId: true,
          videoKey: true,
          thumbnailKey: true,
          videoVisibility: true,
        },
      });
      if (video?.authorId === session?.user.id) {
        if (video.thumbnailKey)
          new DeleteObjectCommand({
            Bucket: "distra-thumbnails",
            Key: video.thumbnailKey,
          });

        if (
          video.videoVisibility === "PUBLIC" ||
          video.videoVisibility === "UNLISTED"
        )
          new DeleteObjectCommand({
            Bucket: "distra-videos",
            Key: video.videoKey,
          });
        else
          new DeleteObjectCommand({
            Bucket: "distra-private-videos",
            Key: video.videoKey,
          });

        await db.video.delete({
          where: {
            id,
          },
        });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({
            success: false,
            error: "You must be the author of the video to delete it.",
          }),
          {
            status: 401,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "You must be logged in to delete a video.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
