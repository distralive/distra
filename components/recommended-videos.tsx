import { authOptions } from "@/lib/auth";
import { recommendVideosForUser } from "@/lib/recommended-videos";
import { getServerSession } from "next-auth";
import { HomeVideoCard } from "@/components/home-video-card";

export async function RecommendedVideos() {
  const session = await getServerSession(authOptions);

  if (session) {
    const videos = await recommendVideosForUser(session?.user.id);

    return (
      <div className="grid grid-rows-4 max-sm:grid-rows-1 max-md:grid-rows-2 gap-4">
        {videos.map((video) => (
          <HomeVideoCard video={video} key={video.id} />
        ))}
      </div>
    );
  }
}
