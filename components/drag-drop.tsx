"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";

const formSchema = z.object({
  title: z.string().max(128),
  description: z.string().max(5000).optional(),
  videoKey: z.string().optional(),
});

function UploadForm({ videoKey }: { videoKey: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    fetch("/api/video/new", {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        videoKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-3 space-y-2 w-96"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your video's title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your video's description"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function DragDrop() {
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
