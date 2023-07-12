import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    videoId: z.string(),
    content: z.string(),
  });

  try {
    const body = await req.json();
    const validBody = schema.safeParse(body);

    if (session) {
      if (validBody.success) {
        await db.comment.create({
          data: {
            text: validBody.data.content,
            videoId: validBody.data.videoId,
            authorId: session.user.id,
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
            error: "Invalid request body.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "You must be signed in to follow people.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
