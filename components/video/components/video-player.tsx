"use client";

import { MediaPlayer, MediaProvider, VideoMimeType } from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";

export function VideoPlayer({
  videoSource,
  mimeType,
  duration,
}: {
  videoSource: string;
  mimeType: VideoMimeType;
  duration: number;
}) {
  return (
    <MediaPlayer
      src={{ src: videoSource, type: mimeType }}
      duration={duration}
      className="aspect-video relative flex"
    >
      <MediaProvider />
      <PlyrLayout icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}
