import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

async function getAllUsers() {
  const users = await db.user.findMany();

  return users;
}

export default async function UsersPage() {
  const users = await getAllUsers();

  return users.map((user) => (
    <div key={user.id}>
      <Link href={`/user/${user.id}`}>
        <div className="flex items-center gap-1.5">
          <Image
            alt={`${user.name}'s profile picture`}
            src={user.image ?? ""}
            width={36}
            height={36}
            className="rounded-full"
          />
          <p className="text-sm font-semibold">{user.name}</p>
        </div>
      </Link>
    </div>
  ));
}
