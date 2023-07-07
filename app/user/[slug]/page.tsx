import { ChannelCard } from "@/components/channel-card";
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
    <>
      <ChannelCard id={params.slug} data={data} />
      <div className="flex flex-col p-3 px-12">
        <p className="text-xl mb-1.5 font-semibold">Videos</p>
        <div className="flex space-x-1.5 overflow-x-auto whitespace-nowrap">
          {data.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </>
  ) : (
    <div>404</div>
  );
}
