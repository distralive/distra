import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const likes = await db.commentVote.count({
    where: {
      commentId: params.slug,
      type: "LIKE",
    },
  });

  const dislikes = await db.commentVote.count({
    where: {
      commentId: params.slug,
      type: "DISLIKE",
    },
  });

  return new Response(JSON.stringify({ likes, dislikes }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    type: z.enum(["LIKE", "DISLIKE"]),
  });

  try {
    const rawBody = await req.arrayBuffer();
    const bodyStr = new TextDecoder("utf-8").decode(rawBody);

    const body = JSON.parse(bodyStr);
    const validBody = schema.safeParse(body);

    if (session) {
      if (validBody.success) {
        const { type } = validBody.data;
        const userId = session.user.id;

        const comment = await db.comment.findUnique({
          where: { id: params.slug },
        });

        if (!comment) {
          // Handle case when video is not found
          throw new Error("Video not found");
        }

        const reaction = await db.commentVote.findUnique({
          where: { userId_commentId: { userId, commentId: comment.id } },
        });

        if (reaction) {
          // If reaction exists and type is the same, delete the reaction
          if (reaction.type === type) {
            await db.commentVote.delete({
              where: { userId_commentId: { userId, commentId: comment.id } },
            });
          } else {
            await db.commentVote.update({
              where: { userId_commentId: { userId, commentId: comment.id } },
              data: { type },
            });
          }
        } else {
          await db.commentVote.create({
            data: {
              user: { connect: { id: userId } },
              comment: { connect: { id: comment.id } },
              type,
            },
          });
        }

        const likes = await db.commentVote.count({
          where: { commentId: comment.id, type: "LIKE" },
        });

        const dislikes = await db.commentVote.count({
          where: { commentId: comment.id, type: "DISLIKE" },
        });

        return new Response(
          JSON.stringify({
            success: true,
            likes,
            dislikes,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid request body" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "applicaton/json" },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
