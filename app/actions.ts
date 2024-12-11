"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { InvoiceSchema, OnboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";
import { auth, signIn } from "./utils/auth";

export async function OnboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: OnboardingSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const data = await prisma.user.update({
    where: { id: session.user?.id },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });
  return redirect("/dashboard");
}
export async function createInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
  });
  const sender = {
    email: "hello@demomailtrap.com",
    name: "Faturly",
  };
  emailClient.send({
    from: sender,
    to: [{ email: "aslikhhamza2001@gmail.com" }],
    template_uuid: "c3bb58cb-288f-4c47-b036-9cce953a719e",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: "#" + submission.value.invoiceNumber,
      dueDate: submission.value.dueDate + " days",
      totalAmount: formatCurrency(
        submission.value.total,
        submission.value.currency
      ),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });
  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: InvoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const data = await prisma.invoice.update({
    where: { id: formData.get("id") as string, userId: session.user?.id },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });
  const sender = {
    email: "hello@demomailtrap.com",
    name: "Faturly",
  };
  emailClient.send({
    from: sender,
    to: [{ email: "aslikhhamza2001@gmail.com" }],
    template_uuid: "26629615-8644-430e-8f74-064a9dfc56f8",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: "#" + submission.value.invoiceNumber,
      dueDate: submission.value.dueDate + " days",
      totalAmount: formatCurrency(
        submission.value.total,
        submission.value.currency
      ),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });
  return redirect("/dashboard/invoices");
}

export async function deleteInvoice(invoiceId: string) {
  const session = await requireUser();
  const data = await prisma.invoice.delete({
    where: { id: invoiceId, userId: session.user?.id },
  });
  return redirect("/dashboard/invoices");
}
export async function markAsPaid(invoiceId: string) {
  const session = await requireUser();
  const data = await prisma.invoice.update({
    where: { id: invoiceId, userId: session.user?.id },
    data: { status: "PAID" },
  });
  return redirect("/dashboard/invoices");
}
export async function handleSignIn(formData: FormData) {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return await signIn("nodemailer", formData);
}
