import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";

async function getMetadata(videoKey: string) {
  const metadata = await db.video.findUnique({
    where: {
      videoKey: videoKey,
    },
    select: {
      id: true,
      title: true,
      description: true,
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          followers: true,
        },
      },
      authorId: true,
      comments: {
        where: {
          videoId: videoKey,
        },
        select: {
          id: true,
          text: true,
          author: true,
          createdAt: true,
          commentId: true,
          replies: true,
          replyToId: true,
          votes: true,
        },
      },
      createdAt: true,
      thumbnailKey: true,
      videoKey: true,
      reactions: true,
      videoVisibility: true,
    },
  });

  return metadata;
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const Key = params.slug;
  const session = await getServerSession(authOptions);
  const metadata = await getMetadata(Key);

  const getVideo = new GetObjectCommand({
    Bucket: "distra-private-videos",
    Key,
  });

  if (session?.user.id === metadata?.authorId) {
    const response = await s3Client.send(getVideo);

    if (!response.Body) {
      return new Response("Video not found", { status: 404 });
    }

    // Convert the response.Body stream to a buffer
    const streamToBuffer = async (stream: any): Promise<Buffer> => {
      return new Promise((resolve, reject) => {
        const chunks: Uint8Array[] = [];
        stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks)));
      });
    };

    try {
      const buffer = await streamToBuffer(response.Body);

      return new Response(buffer, {
        headers: {
          "Content-Type": response.ContentType || "application/octet-stream",
          "Content-Length": buffer.length.toString(),
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Error processing video" }), {
        status: 500,
      });
    }
  } else {
    return new Response(JSON.stringify({ error: "User not logged in" }), {
      status: 401,
    });
  }
}
