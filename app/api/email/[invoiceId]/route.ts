import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();
    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: { id: invoiceId, userId: session.user?.id },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }
    const sender = {
      email: "hello@demomailtrap.com",
      name: "Faturly",
    };
    emailClient.send({
      from: sender,
      to: [{ email: "aslikhhamza2001@gmail.com" }],
      template_uuid: "52c69a8d-246a-471e-b1bb-51aee76e2b09",
      template_variables: {
        clientName: "# " + invoiceData.clientName,
        invoiceNumber: invoiceData.invoiceNumber,
        dueDate: "0 days",
        totalAmount: formatCurrency(invoiceData.total, invoiceData.currency),
        paymentLink: "/",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error sending reminder email" + error },
      { status: 500 }
    );
  }
}
