import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const Key = params.slug;

  const getVideo = new GetObjectCommand({
    Bucket: "distra-videos",
    Key,
  });

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
}
