import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

export function SignUpForm() {
  async function signUp(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
        callbackURL: "/",
      },
    });
  }
  return (
    <form action={signUp}>
      <div className="flex flex-col gap-3">
        <Label>Username</Label>
        <Input name="name" type="text" />
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
