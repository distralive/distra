import { s3Client } from "@/lib/storage";
import Image from "next/image";
import Link from "next/link";

export async function HomeVideoCard({ video }: { key: string; video: any }) {
  if (video.thumbnailKey) {
    const url = s3Client.presign(video.thumbnailKey, {
      bucket: "distra-thumbnails",
    });
    return (
      <div className="space-y-1.5">
        <Link href={`/watch?v=${video.id}`}>
          <Image
            alt={video.title}
            src={url ?? ""}
            width={320}
            height={180}
            className="rounded-md"
          />
        </Link>

        <div className="flex items-center gap-x-1.5">
          <Image
            alt="Image"
            src={video.author.image}
            width={44}
            height={44}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">{video.title}</p>
            <div className="flex items-center gap-x-1">
              <p className="text-sm">{video.author.name}</p>
              <p className="text-sm">•</p>
              <p className="text-sm">2 views</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between">
        <div className="flex flex-col justify-start">
          <Link href={`/watch?v=${video.id}`}>
            <div className="space-y-1.5">
              <div className="flex items-center gap-x-1.5">
                <Image
                  alt="Image"
                  src={video.author.image}
                  width={44}
                  height={44}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{video.title}</p>
                  <div className="flex items-center gap-x-1">
                    <p className="text-sm">{video.author.name}</p>
                    <p className="text-sm">•</p>
                    <p className="text-sm">2 views</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
