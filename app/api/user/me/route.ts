import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const user = await db.user.findUnique({
        where: {
          id: session?.user.id,
        },
      });

      return new Response(JSON.stringify(user), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "You must be logged in to view your own data.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const schema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Display names must have at least 1 character.",
      })
      .max(32, {
        message: "Display name must not be longer than 32 characters.",
      })
      .optional(),
    username: z
      .string()
      .min(2, {
        message: "Username must be at least 2 characters.",
      })
      .max(32, {
        message: "Username must not be longer than 32 characters.",
      })
      .toLowerCase()
      .optional(),
    bio: z.string().max(160).min(4).optional(),
  });

  try {
    const body = await req.json();
    const parsedBody = schema.safeParse(body);

    if (session) {
      if (parsedBody.success) {
        await db.user.update({
          where: {
            id: session.user.id,
          },
          data: parsedBody.data,
        });

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        return new Response(JSON.stringify({ success: false }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "You must be logged in to edit your profile.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
