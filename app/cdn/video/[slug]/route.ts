import { s3Client } from "@/lib/storage";

export async function GET(
  req: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const key = params.slug;
  const file = s3Client.file(key, { bucket: "distra-videos" });

  try {
    const exists = await file.exists();
    if (!exists) {
      return new Response("Video not found", { status: 404 });
    }

    const stats = await file.stat();

    return new Response(file.stream(), {
      headers: {
        "Content-Type": stats.type || "application/octet-stream",
        "Content-Length": stats.size.toString(),
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error processing video" }), {
      status: 500,
    });
  }
}
