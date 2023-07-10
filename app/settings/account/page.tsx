import { Button } from "@/components/ui/button";

export default function AccountSettings() {
  return (
    <>
      <p className="text-xl font-semibold mb-3">Account</p>
      <div className="space-y-1.5">
        <div className="flex justify-between w-full items-center gap-3">
          <div>
            <p>Export your data</p>
            <p className="text-sm text-foreground/70">
              Request for your data here.
            </p>
          </div>
          <Button>Export</Button>
        </div>
        <div className="flex justify-between w-full items-center gap-3">
          <div>
            <p>Delete your account</p>
            <p className="text-sm text-foreground/70">
              Your account will be fully wiped.
            </p>
          </div>
          <Button variant="destructive">Delete</Button>
        </div>
      </div>
    </>
  );
}
