import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ChannelPageCard({ user }: { user: any }) {
  return (
    <div>
      <div className="w-full md:h-56 max-md:h-36 p-1.5">
        <div className="relative w-full h-full">
          <Image
            alt="mmm"
            src={user.image ?? ""}
            objectFit="cover"
            fill
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between items-center py-2 px-6">
        <div className="flex items-center gap-x-3">
          <div className="aspect-square w-14 relative">
            <Image
              alt="mmm"
              src={user.image ?? ""}
              fill
              className="rounded-full"
            />
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm">0 followers</p>
          </div>
        </div>
        <div>
          <Button>Follow</Button>
        </div>
      </div>
    </div>
  );
}
