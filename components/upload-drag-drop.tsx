"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadForm } from "@/components/upload-form";

export function UploadDragDrop() {
  const [uploaded, setUploaded] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Get the first file from the acceptedFiles array
    const file = acceptedFiles[0];

    // Make a GET request to the server to retrieve the presigned URL
    fetch("/api/video/new")
      .then((response) => response.json())
      .then((data) => {
        // Create a new FormData instance
        const formData = new FormData();

        // Append the fields and file to the form data
        Object.entries(data.fields).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append("Content-Type", file.type);
        formData.append("file", file);

        setVideoKey(data.fields.key);

        // Make the POST request to S3
        return fetch(data.url, {
          method: "POST",
          body: formData,
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setUploaded(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [".mp4", ".webm", ".mkv", ".mov", ".flv"] },
    maxFiles: 1,
  });

  return uploaded ? (
    <UploadForm videoKey={videoKey} />
  ) : (
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
