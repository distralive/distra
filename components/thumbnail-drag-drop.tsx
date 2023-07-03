"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export function ThumbnailDragDrop() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    fetch("/api/video/new")
      .then((res) => res.json())
      .then((data) => {
        const formData = new FormData();

        Object.entries(data.thumbnail.fields).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append("Content-Type", file.type);
        formData.append("file", file);

        return fetch(data.thumbnail.url, {
          method: "POST",
          body: formData,
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".avif", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div {...getRootProps()} className="p-48">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-sm">Drop the files here ...</p>
      ) : (
        <p className="text-sm">
          Drag and drop video files here, or click to select files
        </p>
      )}
    </div>
  );
}
