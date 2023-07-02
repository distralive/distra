"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export function VideoReactionButtons({ videoId }: { videoId: string }) {
  const [likes, setLikes] = useState(null);
  const [dislikes, setDislikes] = useState(null);

  useEffect(() => {
    fetch(`/api/video/${videoId}/reactions`)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
        setDislikes(data.dislikes);
      });
  }, [videoId]);

  const handleReaction = async (type: "LIKE" | "DISLIKE") => {
    const response = await fetch(`/api/video/${videoId}/reactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type }),
    });

    if (response.ok) {
      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex gap-2 items-center border-r border-border/25">
        <button
          onClick={() => handleReaction("LIKE")}
          className="flex w-full rounded-s-full bg-accent hover:bg-accent/70 p-2.5 items-center gap-2 transition-colors"
          aria-label="Like this video"
        >
          <Icon icon="ic:round-thumb-up" fontSize={20} />
          <p className="text-sm font-semibold">{likes}</p>
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <button
          onClick={() => handleReaction("DISLIKE")}
          className="flex w-full rounded-e-full bg-accent hover:bg-accent/70 p-2.5 items-center gap-2 transition-colors"
          aria-label="Dislike this video"
        >
          <Icon icon="ic:round-thumb-down" fontSize={20} />
          <p className="text-sm font-semibold">{dislikes}</p>
        </button>
      </div>
    </div>
  );
}
