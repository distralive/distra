import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    name: z.string().min(1).max(64).optional(),
    username: z.string().min(1).max(64).optional(),
  });

  try {
    const body = await req.json();
    const validBody = schema.safeParse(body);

    if (session) {
      if (validBody.success) {
        await db.user.update({
          where: {
            id: session.user.id,
          },
          data: {
            name: validBody.data.name,
            username: validBody.data.username,
          },
        });
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({ success: false, error: "Missing fields." }),
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
          error: "You must be logged in to change your user info.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
