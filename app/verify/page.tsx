"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <Card className="w-[380px] p-5">
        <CardHeader className="text-center m-0 p-0">
          <div className="mx-auto flex size-30">
            <DotLottieReact
              src="https://lottie.host/fad23944-3f0b-4f0c-924b-f768cba03a7d/yuJSiyFxBH.lottie"
              loop
              autoplay
              style={{ width: "120px", height: "120px" }}
            />
          </div>
        </CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Check your Email
        </CardTitle>
        <CardDescription className="text-center">
          We have sent a verification link to your email address.
        </CardDescription>
        <CardContent>
          <div className="mt-4 rounded-md bg-yellow-50  border-yellow-300 p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="size-5 text-yellow-500" />
              <p className="text-sm font-medium text-yellow-700 ml-3">
                Make sure to check your spam folder
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-center">
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full",
              variant: "outline",
            })}
          >
            <ArrowLeft className="size-4 ml-2 " /> Back to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
