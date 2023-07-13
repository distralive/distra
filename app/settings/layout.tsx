import { BottomHamburgerMenu } from "@/components/bottom-hamburger-menu";
import { SettingsButtons } from "@/components/settings-buttons";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container max-w-7xl mx-auto p-2">
        <div className="flex">
          <SettingsButtons />
          <div className="py-1.5 px-3">{children}</div>
        </div>
      </div>

      <BottomHamburgerMenu />
    </>
  );
}
