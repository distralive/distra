import { BottomHamburgerMenu } from "@/components/navigation/bottom-hamburger-menu";
import { HamburgerMenu } from "@/components/navigation/hamburger-menu";
import { RecommendedVideos } from "@/components/home/recommended-videos";

export default function Home() {
  return (
    <>
      <div className="flex">
        <HamburgerMenu />
        {/* <RecommendedVideos /> */}
      </div>

      <BottomHamburgerMenu />
    </>
  );
}
