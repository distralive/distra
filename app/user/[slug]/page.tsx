import { ChannelCard } from "@/components/channel-card";
import { HamburgerMenu } from "@/components/hamburger-menu";
import { VideoCard } from "@/components/video-card";
import { db } from "@/lib/db";

async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      videos: true,
      followers: true,
    },
  });

  return user;
}

export default async function User({ params }: { params: { slug: string } }) {
  const data = await getUser(params.slug);

  return data ? (
    <div className="flex overflow-hidden">
      <div className="flex-shrink-0">
        <HamburgerMenu />
      </div>
      <div className="grid grid-cols-1 auto-rows-auto w-full max-h-[calc(100vh-64px)]">
        <ChannelCard id={params.slug} data={data} />
        <div className="p-3 px-12 overflow-y-auto">
          <p className="text-xl mb-1.5 font-semibold">Videos</p>
          <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-3">
            {data.videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>404</div>
  );
}
