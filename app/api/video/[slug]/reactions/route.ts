import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const likes = await db.reaction.count({
    where: {
      videoId: params.slug,
      type: "LIKE",
    },
  });

  const dislikes = await db.reaction.count({
    where: {
      videoId: params.slug,
      type: "DISLIKE",
    },
  });

  return new Response(JSON.stringify({ likes, dislikes }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
