import { AuthCard } from "@/components/auth-card";
import Link from "next/link";
import Image from "next/image";

import distraLogo from "@/public/distra.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  } else {
    return (
      <>
        <div className="h-fit bg-gradient-to-b dark:from-indigo-800 from-indigo-300 p-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="flex items-center gap-x-1.5">
                <Image alt="distra's logo" src={distraLogo} width={28} />
                <p className="font-display text-lg max-md:hidden">distra</p>
              </div>
            </Link>
          </div>
        </div>
        <main className="flex justify-center items-center h-[calc(100vh-128px)]">
          <div className="w-[430px]">
            <AuthCard />
          </div>
        </main>
      </>
    );
  }
}
