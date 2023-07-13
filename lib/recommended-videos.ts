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

  const likedAndFollowingLikedVideoIds = Array.from(
    new Set([...likedVideos, ...followingLikedVideoIds])
  );

  // Fetch tags and titles for these videos
  const videosWithTagsAndTitles = await db.video.findMany({
    where: {
      id: {
        in: likedAndFollowingLikedVideoIds,
      },
    },
    include: {
      tags: {
        select: {
          tag: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const tagIds = videosWithTagsAndTitles.flatMap((video) =>
    video.tags.map((tag) => tag.tag.id)
  );

  const titleWords = videosWithTagsAndTitles.flatMap((video) =>
    video.title.split(" ")
  );

  // Fetch recommended videos
  const recommendedVideos = await db.video.findMany({
    where: {
      OR: [
        {
          tags: {
            some: {
              tagId: {
                in: tagIds,
              },
            },
          },
        },
        {
          OR: titleWords.map((word) => ({
            title: {
              contains: word,
            },
          })),
        },
      ],
      // Exclude videos the user has already liked
      id: {
        notIn: likedAndFollowingLikedVideoIds,
      },
    },
    include: {
      author: true,
      tags: true, // Include the associated tags in the response
    },
  });

  return recommendedVideos;
}
