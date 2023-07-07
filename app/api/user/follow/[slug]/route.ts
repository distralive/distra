import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  const followedId = params.slug;

  try {
    const followCount = db.follow.count({
      where: {
        followedId,
      },
    });

    if (session) {
      const isFollowing = await db.follow.findUnique({
        where: {
          followingId_followedId: {
            followingId: session.user.id,
            followedId,
          },
        },
      });

      return new Response(
        JSON.stringify({
          success: true,
          followCount,
          isFollowing: !!isFollowing,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(JSON.stringify({ success: true, followCount }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const followedId = params.slug;
      if (session.user.id === followedId) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Users cannot follow themselves.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        const existingFollow = await db.follow.findUnique({
          where: {
            followingId_followedId: {
              followingId: session.user.id,
              followedId: followedId,
            },
          },
        });

        if (existingFollow) {
          await db.follow.delete({
            where: {
              followingId_followedId: {
                followingId: session.user.id,
                followedId: followedId,
              },
            },
          });

          return new Response(
            JSON.stringify({
              success: true,
              message: "You have unfollowed this user.",
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const newFollow = await db.follow.create({
          data: {
            followingId: session.user.id,
            followedId: followedId,
          },
        });

        return new Response(JSON.stringify({ success: true, newFollow }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
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
