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
      email: "hello@faturly.online",
      name: "Faturly",
    };
    const recipients = [
      {
        email: invoiceData.clientEmail,
        name: invoiceData.clientName,
      },
    ];
    emailClient.send({
      from: sender,
      to: recipients,
      template_uuid: "0ac75e18-cefd-484d-95dc-9ba39a89f9db",
      template_variables: {
        clientName: invoiceData.clientName,
        invoiceNumber: "# " + invoiceData.invoiceNumber,
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
