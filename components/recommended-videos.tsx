import { authOptions } from "@/lib/auth";
import { recommendVideosForUser } from "@/lib/recommended-videos";
import { getServerSession } from "next-auth";
import { VideoCard } from "@/components/video-card";

export async function RecommendedVideos() {
  const session = await getServerSession(authOptions);

  if (session) {
    const videos = await recommendVideosForUser(session?.user.id);

    return videos.map((video) => <VideoCard video={video} key={video.id} />);
  }
}
