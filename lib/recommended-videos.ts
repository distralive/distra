import { ReactionType } from "@prisma/client";
import { db } from "@/lib/db";

function shuffle(array: Array<any>) {
  array.sort(() => Math.random() - 0.5);
}

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

  // Fetch videos liked by similar users (the ones current user is following)
  const similarUsersLikedVideos = await db.reaction.findMany({
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

  const similarUsersLikedVideoIds = similarUsersLikedVideos.map(
    (reaction) => reaction.videoId
  );

  const likedAndSimilarUsersLikedVideoIds = Array.from(
    new Set([...likedVideos, ...similarUsersLikedVideoIds])
  );

  // Fetch tags and titles for these videos
  const videosWithTagsAndTitles = await db.video.findMany({
    where: {
      id: {
        in: likedAndSimilarUsersLikedVideoIds,
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
        notIn: likedAndSimilarUsersLikedVideoIds,
      },
    },
    include: {
      author: true,
      tags: true, // Include the associated tags in the response
    },
    orderBy: {
      createdAt: "desc", // Prioritize newer videos
    },
  });

  shuffle(recommendedVideos);

  return recommendedVideos;
}
