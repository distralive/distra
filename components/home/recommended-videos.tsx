import { recommendVideosForUser } from "@/lib/video";
import { HomeVideoCard } from "@/components/home/components/home-video-card";
import { authClient } from "@/lib/auth/auth-client";

export async function RecommendedVideos() {
  const { data: session } = await authClient.getSession();

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
