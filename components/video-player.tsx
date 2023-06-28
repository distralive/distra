"use client";

import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export function VideoPlayer({ videoSource }: { videoSource: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const player = new Plyr(videoRef.current);

    // Clean up to avoid memory leaks
    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  return (
    <video ref={videoRef} controls className="aspect-video">
      <source src={videoSource} type="video/mp4" />
    </video>
  );
}
