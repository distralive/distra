import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/storage";
import { S3FilePresignOptions } from "bun";
import { headers } from "next/headers";
import { z } from "zod";

export async function GET(req: Request) {
  let session;
  try {
    session = await auth.api.getSession({ headers: req.headers });
  } catch (error) {
    return new Response(
      // @ts-ignore
      JSON.stringify({ error: "Error fetching session: " + error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!session) {
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

  const videoKey = `${session.user.id}-${Date.now()}-video`;
  const thumbnailKey = `${session.user.id}-${Date.now()}-thumbnail`;
  const { searchParams } = new URL(req.url);
  const videoType = searchParams.get("videoType");
  const thumbnailType = searchParams.get("thumbnailType");

  const videoParams: S3FilePresignOptions = {
    bucket: "distra-videos",
    expiresIn: 7200,
    method: "PUT",
    type: videoType ?? "video/mp4",
  };

  const thumbnailParams: S3FilePresignOptions = {
    bucket: "distra-thumbnails",
    expiresIn: 600,
    method: "PUT",
    type: thumbnailType ?? "image/jpeg",
  };

  let videoPresignedUrl, thumbnailPresignedUrl;
  try {
    videoPresignedUrl = s3Client.presign(videoKey, videoParams);
    thumbnailPresignedUrl = s3Client.presign(thumbnailKey, thumbnailParams);
  } catch (error) {
    return new Response(
      JSON.stringify({
        // @ts-ignore
        error: "Error creating presigned URLs: " + error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      video: {
        url: videoPresignedUrl,
        key: videoKey,
        method: "PUT",
      },
      thumbnail: {
        url: thumbnailPresignedUrl,
        key: thumbnailKey,
        method: "PUT",
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  const schema = z.object({
    title: z.string().max(128),
    description: z.string().max(5000).optional(),
    videoVisibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]).optional(),
    videoKey: z.string(),
    thumbnailKey: z.string().optional(),
    tags: z.array(z.string()).optional(),
    duration: z.coerce.number().nonnegative().optional(),
  });

  async function moveS3Object(
    srcBucket: string,
    destBucket: string,
    objectKey: string
  ) {
    try {
      const sourceFile = s3Client.file(objectKey, { bucket: srcBucket });
      const destFile = s3Client.file(objectKey, { bucket: destBucket });

      await destFile.write(sourceFile);
      console.log(`Successfully copied '${objectKey}' to '${destBucket}'.`);

      await sourceFile.delete();

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
        const videoData: any = {
          title: validBody.data.title,
          description: validBody.data.description,
          videoVisibility: validBody.data.videoVisibility,
          videoKey: validBody.data.videoKey,
          thumbnailKey: validBody.data.thumbnailKey,
          authorId: session.user.id,
          duration: validBody.data.duration,
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
