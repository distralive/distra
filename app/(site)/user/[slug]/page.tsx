import { ChannelPageCard } from "@/components/channel-page-card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";

async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: {},
  });

  return user;
}

export default async function User({ params }: { params: { slug: string } }) {
  const user = await getUser(params.slug);

  if (user) {
    return <ChannelPageCard user={user} />;
  }
}
