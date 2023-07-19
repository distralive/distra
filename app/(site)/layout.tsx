import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <Sidebar>{children}</Sidebar>
    </>
  );
}
