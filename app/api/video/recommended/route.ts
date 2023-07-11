import { authOptions } from "@/lib/auth";
import { recommendVideosForUser } from "@/lib/recommended-videos";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const recommendedVideos = await recommendVideosForUser(session.user.id);

      return new Response(JSON.stringify(recommendedVideos), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "You must be logged in to get personalized videos.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
