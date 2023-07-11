import { ReactionType } from "@prisma/client";
import { db } from "@/lib/db";

export async function recommendVideosForUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: { reactions: true, following: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Fetch liked videos
  const likedVideos = user.reactions
    .filter((reaction) => reaction.type === ReactionType.LIKE)
    .map((reaction) => reaction.videoId);

  // Fetch videos liked by users the current user is following
  const followingLikedVideos = await db.reaction.findMany({
    where: {
      type: ReactionType.LIKE,
      user: {
        id: {
          in: user.following.map((following) => following.followedId),
        },
      },
    },
    select: {
      videoId: true,
    },
  });

  const followingLikedVideoIds = followingLikedVideos.map(
    (reaction) => reaction.videoId
  );

  const recommendedVideoIds = Array.from(
    new Set([...likedVideos, ...followingLikedVideoIds])
  );

  // Fetch recommended videos
  const recommendedVideos = await db.video.findMany({
    where: {
      id: {
        in: recommendedVideoIds,
      },
    },
  });

  return recommendedVideos;
}
