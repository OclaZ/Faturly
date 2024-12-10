import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { auth, signIn } from "../utils/auth";
import SubmitButton from "@/components/SubmitButtons";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="flex h-screen w-full items-center justify-center px-4">
        <Card className=" max-w-sm">
          <CardHeader>
            <Image
              src="/logo dark.svg"
              alt="logo"
              width={150}
              height={150}
              className="mx-auto mb-5"
            />
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your Email bellow to login into your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="example@ex.com"
                />
                <SubmitButton text="Login" />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
