import { db } from "@/lib/db";

export async function GET(req: Request, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const id = params.slug;

  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      comments: true,
      videos: true,
    },
  });

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
}
