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
      const key = `${session.user.id}-${Date.now()}-video`;
      const postParams: PresignedPostOptions = {
        Bucket: "distra-videos",
        Key: key,
        Expires: 7200,
        Conditions: [
          ["starts-with", "$Content-Type", "video/"], // Only allow video content types
        ],
      };

      const presignedPost = await createPresignedPost(s3Client, postParams);

      return new Response(JSON.stringify(presignedPost), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
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
  });

  try {
    const body = schema.safeParse(req.body);

    if (session) {
      if (body.success) {
        // The video should be uploaded to S3 first, then the metadata is saved to the DB.
        const video = await db.video.create({
          data: {
            title: body.data.title,
            description: body.data.description,
            authorId: session.user.id,
          },
        });
        return new Response(JSON.stringify({ success: true }), {
          status: 201,
          headers: { "Content-Type": "application/json" },
        });
      } else {
        return new Response(JSON.stringify({ error: "Title is required." }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
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
