import { db } from "@/lib/db";

async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export default async function User({ params }: { params: { slug: string } }) {
  const data = await getUser(params.slug);

  return data ? (
    <>
      <div>{data.name}</div>
    </>
  ) : (
    <div>404</div>
  );
}
