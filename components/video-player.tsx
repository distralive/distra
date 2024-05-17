"use client";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
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
  mimeType: string;
}) {
  return (
    <MediaPlayer src={videoSource} className="aspect-video flex">
      <MediaProvider />
      <PlyrLayout icons={plyrLayoutIcons} />
    </MediaPlayer>
  );
}
