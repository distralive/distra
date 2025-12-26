"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { DragDrop } from "@/components/upload/components/drag-drop";

const formSchema = z.object({
  title: z.string().max(128),
  description: z.string().max(5000).optional(),
  videoVisibility: z.enum(["PUBLIC", "UNLISTED", "PRIVATE"]).default("PUBLIC"),
  tags: z.string().optional(),
});

export function UploadForm({
  videoKey,
  uploadStatus,
  duration,
}: {
  videoKey: string;
  uploadStatus: string;
  duration?: number | null;
}) {
  const [thumbnailKey, setThumbnailKey] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const params = new URLSearchParams();
    if (file.type) {
      params.set("thumbnailType", file.type);
    }

    const url = params.toString()
      ? `/api/video/new?${params.toString()}`
      : "/api/video/new";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setThumbnailKey(data.thumbnail.key);

        const uploadHeaders = file.type
          ? { "Content-Type": file.type }
          : undefined;

        return fetch(data.thumbnail.url, {
          method: data.thumbnail.method ?? "PUT",
          body: file,
          headers: uploadHeaders,
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoVisibility: "PUBLIC",
      tags: undefined,
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (uploadStatus !== "finished") {
      return;
    }

    const tags = values.tags?.split(",");
    const durationSeconds =
      typeof duration === "number" && Number.isFinite(duration)
        ? duration
        : undefined;

    fetch("/api/video/new", {
      method: "POST",
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        videoVisibility: values.videoVisibility.toUpperCase(),
        thumbnailKey,
        videoKey,
        tags,
        duration: durationSeconds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Successful submission, redirect to homepage
      router.push("/");
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
        <FormField
          control={form.control}
          name="videoVisibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Visibility</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the type of visibility of your video (e.g. public)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your video's tags (separate with comma)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={uploadStatus !== "finished"}>
          Submit
        </Button>
      </form>
      <DragDrop
        onDrop={onDrop}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".avif", ".webp"] }}
        multiple={false}
      />
    </Form>
  );
}
