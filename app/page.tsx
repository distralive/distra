import { BottomHamburgerMenu } from "@/components/bottom-hamburger-menu";
import { HamburgerMenu } from "@/components/hamburger-menu";
import { RecommendedVideos } from "@/components/recommended-videos";

export default function Home() {
  return (
    <>
      <div className="flex">
        <HamburgerMenu />
        <RecommendedVideos />
      </div>

      <BottomHamburgerMenu />
    </>
  );
}
