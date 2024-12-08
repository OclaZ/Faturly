import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import { notoSansRegularFont, notoSansBoldFont } from "./fonts";
import { formatCurrencyPdf } from "@/app/utils/formatCurrencyPdf";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;
  const data = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: {
      invoiceName: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      total: true,
      fromName: true,
      fromAddress: true,
      fromEmail: true,
      note: true,
      invoiceNumber: true,
      currency: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
    },
  });
  if (!data)
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const PDF = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Add Noto Sans fonts
  PDF.addFileToVFS("NotoSans-Regular-normal.ttf", notoSansRegularFont);
  PDF.addFileToVFS("NotoSans-Bold-normal.ttf", notoSansBoldFont);
  PDF.addFont("NotoSans-Regular-normal.ttf", "NotoSans-Regular", "normal");
  PDF.addFont("NotoSans-Bold-normal.ttf", "NotoSans-Bold", "normal");

  // Color scheme
  const blackColor = "#000000";

  const lightGrayColor = "#F5F5F5";

  // Helper function to add a colored rectangle
  const addColoredRectangle = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) => {
    PDF.setFillColor(color);
    PDF.rect(x, y, width, height, "F");
  };

  // Header
  PDF.setFontSize(28);
  PDF.setFont("NotoSans-Bold");
  PDF.text("INVOICE", 20, 20);

  // From section
  PDF.setFontSize(10);
  PDF.setFont("NotoSans-Bold");
  PDF.text("From", 20, 35);
  PDF.setFont("NotoSans-Regular");
  PDF.text([data.fromName, data.fromEmail, data.fromAddress], 20, 40);

  // Client section
  PDF.setFont("NotoSans-Bold");
  PDF.text("Bill To", 20, 60);
  PDF.setFont("NotoSans-Regular");
  PDF.text([data.clientName, data.clientEmail, data.clientAddress], 20, 65);

  // Invoice details
  PDF.setFont("NotoSans-Regular");
  PDF.text(`Invoice Number: #${data.invoiceNumber}`, 130, 35);
  PDF.text(
    `Date: ${new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
      new Date(data.date)
    )}`,
    130,
    40
  );
  PDF.text(`Due Date: Net ${data.dueDate}`, 130, 45);

  // Decorative line
  PDF.setDrawColor(blackColor);
  PDF.setLineWidth(0.5);
  PDF.line(20, 80, 190, 80);

  // Table headers
  addColoredRectangle(20, 85, 170, 10, lightGrayColor);
  PDF.setFontSize(10);
  PDF.setFont("NotoSans-Bold");
  PDF.text("Description", 25, 92);
  PDF.text("Quantity", 100, 92);
  PDF.text("Rate", 130, 92);
  PDF.text("Amount", 160, 92);

  // Table data
  PDF.setFont("NotoSans-Regular");
  PDF.text(data.invoiceItemDescription, 25, 105);
  PDF.text(data.invoiceItemQuantity.toString(), 100, 105);
  PDF.text(formatCurrencyPdf(data.invoiceItemRate, data.currency), 130, 105);
  PDF.text(formatCurrencyPdf(data.total, data.currency), 160, 105);

  // Table lines
  PDF.setDrawColor(lightGrayColor);
  PDF.setLineWidth(0.1);
  PDF.line(20, 110, 190, 110);

  // Table total
  addColoredRectangle(130, 115, 60, 10, lightGrayColor);
  PDF.setFontSize(12);
  PDF.setFont("NotoSans-Bold");
  PDF.text(`Total (${data.currency})`, 135, 122);
  PDF.text(formatCurrencyPdf(data.total, data.currency), 162, 122);

  // Additional notes
  if (data.note) {
    PDF.setFontSize(10);
    PDF.setFont("NotoSans-Regular");
    PDF.text("Notes:", 20, 135);
    PDF.text(data.note, 20, 140);
  }

  // Footer
  PDF.setFontSize(10);
  PDF.setFont("NotoSans-Regular");
  PDF.text("Thank you for your business", 105, 270, { align: "center" });
  PDF.setFontSize(8);
  PDF.text(
    `Invoice #${data.invoiceNumber} | Total: ${formatCurrencyPdf(
      data.total,
      data.currency
    )} | Due Date: ${data.dueDate}`,
    105,
    275,
    { align: "center" }
  );
  PDF.setFont("NotoSans-Bold");
  PDF.text("Faturly - The Best Invoice Software", 105, 280, {
    align: "center",
  });

  // Decorative border
  PDF.setDrawColor(blackColor);
  PDF.setLineWidth(0.5);
  PDF.rect(10, 10, 190, 277);

  // Generate PDF as buffer
  const pdfBuffer = Buffer.from(PDF.output("arraybuffer"));

  // Download PDF
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
