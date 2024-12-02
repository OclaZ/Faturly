"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
interface SubmitButtonProps {
  text: string;
}
export default function SubmitButton({ text }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait ...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          {text}
        </Button>
      )}
    </>
  );
}
