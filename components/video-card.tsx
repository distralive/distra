import Image from "next/image";
import Link from "next/link";

export function VideoCard({ video }: { key: string; video: any }) {
  return (
    <Link href={`/watch?v=${video.id}`}>
      <div className="space-y-1.5">
        <Image
          alt={video.title}
          src={video.thumbnailKey}
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
}
