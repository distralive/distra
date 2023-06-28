"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  options: videojs.PlayerOptions;
}

const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const videoNode = useRef<HTMLVideoElement>(null);
  const defaultOptions = {
    autoplay: true,
    controls: true,
  };

  const options = Object.assign({}, defaultOptions, props.options);

  useEffect(() => {
    if (videoNode.current) {
      const player = videojs(videoNode.current, options, () => {
        console.log("player is ready");
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [options]);

  return (
    <div data-vjs-player>
      <video ref={videoNode} className="video-js" />
    </div>
  );
};

export { VideoPlayer };
