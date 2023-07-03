import { s3Client } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";
import Link from "next/link";

export async function VideoCard({ video }: { key: string; video: any }) {
  if (video.thumbnailKey) {
    const command = new GetObjectCommand({
      Bucket: "distra-thumbnails",
      Key: video.thumbnailKey,
    });

    const url = await getSignedUrl(s3Client, command, { expiresIn: 86400 });
    return (
      <Link href={`/watch?v=${video.id}`}>
        <div className="space-y-1.5">
          <Image
            alt={video.title}
            src={url ?? ""}
            width={320}
            height={180}
            className="rounded-md"
          />
          <div>
            <p className="text-sm font-semibold">{video.title}</p>
            <p className="text-sm">2 views</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/watch?v=${video.id}`}>
        <div className="space-y-1.5">
          <div>
            <p className="text-sm font-semibold">{video.title}</p>
            <p className="text-sm">2 views</p>
          </div>
        </div>
      </Link>
    );
  }
}
