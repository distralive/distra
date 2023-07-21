"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Textarea } from "@/components/ui/textarea";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Display names must have at least 1 character.",
    })
    .max(32, {
      message: "Display name must not be longer than 32 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(32, {
      message: "Username must not be longer than 32 characters.",
    })
    .toLowerCase()
    .optional(),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm({ user }: { user: any }) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
    },
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    fetch("/api/user/me", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription className="max-md:hidden">
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription className="max-md:hidden">
                This is your username. It can be your real name or a pseudonym,
                but remember that it&apos;s unique for each user.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
