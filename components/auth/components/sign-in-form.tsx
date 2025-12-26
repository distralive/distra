import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

export function SignInForm() {
  async function signIn(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/",
      },
    });
  }
  return (
    <form action={signIn}>
      <div className="flex flex-col gap-3">
        <Label>Email</Label>
        <Input name="email" type="email" />
        <Label>Password</Label>
        <Input name="password" type="password" />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
}
