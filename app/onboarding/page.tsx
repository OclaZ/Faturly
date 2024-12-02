"use client";
import SubmitButton from "@/components/SubmitButtons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { OnboardUser } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnboardingSchema } from "../utils/zodSchemas";

export default function Onboarding() {
  const [lastResult, action] = useActionState(OnboardUser, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnboardingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            You are almost there !{" "}
          </CardTitle>
          <CardDescription>
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  placeholder="John"
                  name={fields.firstName.name}
                  key={fields.firstName.key}
                  defaultValue={fields.firstName.initialValue}
                />
                <p className="text-sm text-red-500">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  placeholder="Doe"
                  name={fields.lastName.name}
                  key={fields.lastName.key}
                  defaultValue={fields.lastName.initialValue}
                />
                <p className="text-sm text-red-500 ">
                  {fields.lastName.errors}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <Label>Address</Label>
              <Input
                placeholder="123 Main St"
                name={fields.address.name}
                key={fields.address.key}
                defaultValue={fields.address.initialValue}
              />

              <p className="text-sm text-red-500">{fields.address.errors}</p>
            </div>
            <SubmitButton text="Finish Registration " />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
