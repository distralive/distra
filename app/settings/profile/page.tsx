import { ProfileForm } from "@/components/user/profile-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Session, User } from "better-auth";

export default async function ProfileSettings() {
  const authSession = await auth.api.getSession({
    headers: await headers(),
  });
  const session: { session: Session; user: User } | null = authSession;

  return (
    <>
      <p className="text-xl font-semibold mb-3">Profile</p>
      <div className="space-y-1.5">
        <div className="flex">
          <ProfileForm session={session} />
        </div>
      </div>
    </>
  );
}
