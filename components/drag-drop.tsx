"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export function DragDrop() {
  const [uploaded, setUploaded] = useState(false);

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

  if (uploaded) {
    return (
      <form>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  } else {
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
}
