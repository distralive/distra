import { DragDrop } from "@/components/drag-drop";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Upload() {
  return (
    <div className="h-[calc(100vh-64px)] w-full grid place-items-center">
      <div className="flex flex-col border rounded-md">
        <div className="flex items-center h-full border-b p-2 justify-between">
          <div className="flex items-center gap-1.5 justify-start">
            <Link href="/">
              <button className="text-2xl hover:bg-slate-900 w-8 h-8 rounded-full transition-all">
                {"<-"}
              </button>
            </Link>
            <p className="text-sm font-semibold">Upload a new video</p>
          </div>
          <div className="flex items-center justify-end mr-1.5">
            <p className="font-display">distra</p>
          </div>
        </div>
        <div className="flex">
          <DragDrop />
        </div>
      </div>
    </div>
  );
}
