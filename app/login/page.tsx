import { Button } from "@/components/ui/button";
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
import { signIn } from "../utils/auth";

export default function Login() {
  return (
    <>
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
              action={async () => {
                "use server";
                await signIn();
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input type="email" name="email" placeholder="example@ex.com" />
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
