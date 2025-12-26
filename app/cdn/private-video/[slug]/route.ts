import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/storage";

async function getMetadata(videoKey: string) {
  const metadata = await db.video.findUnique({
    where: {
      videoKey: videoKey,
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
          videoId: videoKey,
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

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const key = params.slug;
  const session = await auth.api.getSession({ headers: req.headers });
  const metadata = await getMetadata(key);

  if (session?.user.id === metadata?.authorId) {
    const file = s3Client.file(key, { bucket: "distra-private-videos" });

    try {
      const exists = await file.exists();
      if (!exists) {
        return new Response("Video not found", { status: 404 });
      }

      const stats = await file.stat();

      return new Response(file.stream(), {
        headers: {
          "Content-Type": stats.type || "application/octet-stream",
          "Content-Length": stats.size.toString(),
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error processing video" }), {
        status: 500,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "User not logged in" }), {
      status: 401,
    });
  }
}
