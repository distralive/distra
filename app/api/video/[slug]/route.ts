import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/storage";

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
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
      comments: {
        where: {
          videoId: id,
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
      reactions: true,
      duration: true,
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
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const id = params.slug;
  const session = await auth.api.getSession({ headers: req.headers });

  try {
    if (session) {
      const video = await db.video.findUnique({
        where: {
          id,
        },
      });
      if (video?.authorId === session?.user.id) {
        if (video.thumbnailKey) {
          s3Client.delete(video.thumbnailKey, { bucket: "distra-thumbnails" });
        }

        if (
          video.videoVisibility === "PUBLIC" ||
          video.videoVisibility === "UNLISTED"
        ) {
          s3Client.delete(video.videoKey, { bucket: "distra-videos" });
        } else {
          s3Client.delete(video.videoKey, { bucket: "distra-private-videos" });
        }

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
