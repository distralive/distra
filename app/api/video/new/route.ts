import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import {
  createPresignedPost,
  type PresignedPostOptions,
} from "@aws-sdk/s3-presigned-post";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    if (session) {
      const videoKey = `${session.user.id}-${Date.now()}-video`;
      const videoParams: PresignedPostOptions = {
        Bucket: "distra-videos",
        Key: videoKey,
        Expires: 7200,
        Conditions: [
          ["starts-with", "$Content-Type", "video/"], // Only allow video content types
        ],
      };

      const thumbnailKey = `${session.user.id}-${Date.now()}-thumbnail`;
      const thumbnailParams: PresignedPostOptions = {
        Bucket: "distra-thumbnails",
        Key: thumbnailKey,
        Expires: 600,
        Conditions: [
          ["starts-with", "$Content-Type", "image/"], // Only allow image content types
        ],
      };

      const videoPresignedUrl = await createPresignedPost(
        s3Client,
        videoParams
      );
      const thumbnailPresignedUrl = await createPresignedPost(
        s3Client,
        thumbnailParams
      );

      return new Response(
        JSON.stringify({
          video: videoPresignedUrl,
          thumbnail: thumbnailPresignedUrl,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "You have to be logged in to upload videos.",
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const schema = z.object({
    title: z.string().max(128),
    description: z.string().max(5000).optional(),
    videoKey: z.string(),
    thumbnailKey: z.string().optional(),
  });

  try {
    const rawBody = await req.arrayBuffer();
    const bodyStr = new TextDecoder("utf-8").decode(rawBody);

    const body = JSON.parse(bodyStr);
    const validBody = schema.safeParse(body);

    if (session) {
      if (validBody.success) {
        await db.video.create({
          data: {
            title: validBody.data.title,
            description: validBody.data.description,
            videoKey: validBody.data.videoKey,
            thumbnailKey: validBody.data.thumbnailKey,
            authorId: session.user.id,
          },
        });
        return new Response(JSON.stringify({ success: true }), {
          status: 201,
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
        JSON.stringify({ error: "You have to be logged in to upload videos." }),
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
