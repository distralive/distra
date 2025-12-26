"use client";

import { useCallback, useState } from "react";
import { UploadForm } from "@/components/upload/components/upload-form";
import { DragDrop } from "@/components/upload/components/drag-drop";

export function UploadDragDrop() {
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [videoKey, setVideoKey] = useState("");
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const loadVideoDuration = useCallback((file: File) => {
    return new Promise<number>((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const video = document.createElement("video");

      const cleanup = () => URL.revokeObjectURL(url);

      video.preload = "metadata";
      video.onloadedmetadata = () => {
        const duration = video.duration;
        cleanup();
        if (Number.isFinite(duration)) {
          resolve(duration);
        } else {
          reject(new Error("Invalid video duration"));
        }
      };
      video.onerror = () => {
        cleanup();
        reject(new Error("Failed to load video metadata"));
      };
      video.src = url;
    });
  }, []);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Get the first file from the acceptedFiles array
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }

    setVideoDuration(null);
    loadVideoDuration(file)
      .then((duration) => setVideoDuration(duration))
      .catch((error) => {
        console.error("Error reading video duration:", error);
      });

    const params = new URLSearchParams();
    if (file.type) {
      params.set("videoType", file.type);
    }

    const url = params.toString()
      ? `/api/video/new?${params.toString()}`
      : "/api/video/new";

    // Make a GET request to the server to retrieve the presigned URL
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVideoKey(data.video.key);
        setUploadStatus("uploading");

        const uploadHeaders = file.type
          ? { "Content-Type": file.type }
          : undefined;

        return fetch(data.video.url, {
          method: data.video.method ?? "PUT",
          body: file,
          headers: uploadHeaders,
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setUploadStatus("finished");
      })
      .catch((error) => {
        console.error("Error:", error);
        setUploadStatus("idle");
      });
  }, [loadVideoDuration]);

  return uploadStatus !== "idle" ? (
    <UploadForm
      videoKey={videoKey}
      uploadStatus={uploadStatus}
      duration={videoDuration}
    />
  ) : (
    <DragDrop
      onDrop={onDrop}
      accept={{ "video/*": [".mp4", ".webm", ".mkv", ".mov", ".flv"] }}
      multiple={false}
    />
  );
}
