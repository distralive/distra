import { db } from "@/lib/db";

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
