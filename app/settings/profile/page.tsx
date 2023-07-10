import { ProfileForm } from "@/components/profile-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function ProfileSettings() {
  const session = await getServerSession(authOptions);

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
