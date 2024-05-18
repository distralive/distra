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
}: {
  videoSource: string;
  mimeType: VideoMimeType;
}) {
  return (
    <MediaPlayer
      src={{ src: videoSource, type: mimeType }}
      className="aspect-video flex"
    >
      <MediaProvider />
      <PlyrLayout icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}
