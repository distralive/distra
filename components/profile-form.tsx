"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Session } from "next-auth";

const formSchema = z.object({
  name: z.string().min(1).max(64).optional(),
  username: z.string().min(1).max(64).optional(),
});

export function ProfileForm({ session }: { session: Session | null }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch("/api/user/update", {
      method: "PUT",
      body: JSON.stringify({ name: values?.name, username: values?.username }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div className="flex flex-col space-y-2 w-96">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={session?.user.name as string}
                      {...field}
                    />
                  </FormControl>
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
                    <Input
                      placeholder={(session?.user.name as string).toLowerCase()}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
