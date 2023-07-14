import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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
    videoVisibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]).optional(),
    videoKey: z.string(),
    thumbnailKey: z.string().optional(),
    tags: z.array(z.string()).optional(),
  });

  async function moveS3Object(
    srcBucket: string,
    destBucket: string,
    objectKey: string
  ) {
    try {
      // Copy the object
      await s3Client.send(
        new CopyObjectCommand({
          Bucket: destBucket,
          CopySource: encodeURIComponent(srcBucket + "/" + objectKey),
          Key: objectKey,
        })
      );

      console.log(`Successfully copied '${objectKey}' to '${destBucket}'.`);

      // Delete the object from source bucket
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: srcBucket,
          Key: objectKey,
        })
      );

      console.log(`Successfully deleted '${objectKey}' from '${srcBucket}'.`);
    } catch (err) {
      console.error(err);
    }
  }

  try {
    const body = await req.json();
    const validBody = schema.safeParse(body);

    if (session) {
      if (validBody.success) {
        let videoData: any = {
          title: validBody.data.title,
          description: validBody.data.description,
          videoVisibility: validBody.data.videoVisibility,
          videoKey: validBody.data.videoKey,
          thumbnailKey: validBody.data.thumbnailKey,
          authorId: session.user.id,
        };

        const video = await db.video.create({
          data: videoData,
        });

        if (validBody.data.tags) {
          for (const tagName of validBody.data.tags) {
            let tag = await db.tag.findUnique({ where: { name: tagName } });
            if (!tag) {
              tag = await db.tag.create({ data: { name: tagName } });
            }
            await db.tagOnVideo.create({
              data: {
                videoId: video.id,
                tagId: tag.id,
              },
            });
          }
        }

        if (video.videoVisibility === "PRIVATE") {
          await moveS3Object(
            "distra-videos",
            "distra-private-videos",
            video.videoKey
          );
        }

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
