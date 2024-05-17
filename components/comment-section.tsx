"use client";

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
import { Input } from "@/components/ui/input";

import { Session } from "next-auth";

import Image from "next/image";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const formSchema = z.object({
  content: z.string().min(1),
});

async function fetchVideoMetadata(videoId: string) {
  const response = await fetch(`/api/video/${videoId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch video metadata");
  }
  return await response.json();
}

export function CommentSection({
  session,
  video,
}: {
  session: Session | null;
  video: any; // idk
}) {
  const [comments, setComments] = useState(video.comments);

  useEffect(() => {
    setComments(video.comments);
  }, [video.comments]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    fetch("/api/comment/new", {
      method: "POST",
      body: JSON.stringify({ content: values.content, videoId: video.id }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      if (res.ok) {
        const updatedVideo = await fetchVideoMetadata(video.id);
        console.log(updatedVideo.comments);
        setComments(updatedVideo.comments);
      }
    });
  }

  return (
    <div className="space-y-3">
      <p className="font-semibold text-lg">{comments.length} Comments</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-1.5">
            <Image
              alt="Your profile picture"
              src={session?.user.image ?? ""}
              width={48}
              height={48}
              className="rounded-full"
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Add a comment" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Send</Button>
          </div>
        </form>
      </Form>
      <div className="space-y-3">
        {comments.map((comment: any) => (
          <div className="flex items-center gap-3" key={comment.id}>
            <Image
              alt="Your profile picture"
              src={comment?.author?.image ?? ""}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">{comment?.author?.name}</p>
              <p className="text-sm">{comment?.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
