import { ProfileForm } from "@/components/profile-form";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function SettingsProfilePage() {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm user={user} />
    </div>
  );
}
