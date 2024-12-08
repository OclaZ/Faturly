import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Badge } from "./ui/badge";
import { InvoiceActions } from "./InvoiceActions";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: { userId: userId },
    select: {
      id: true,
      clientName: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return data;
}

export async function InvoiceList() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Invoice ID</TableHead>
          <TableHead className="">Customer</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="">Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">
              # {invoice.invoiceNumber}
            </TableCell>
            <TableCell className="font-medium">{invoice.clientName}</TableCell>
            <TableCell className="font-medium">
              {formatCurrency(invoice.total, invoice.currency)}
            </TableCell>
            <TableCell className="font-medium">
              <Badge
                className={
                  invoice.status === "PAID" ? "bg-green-500" : "bg-red-500"
                }
              >
                {invoice.status}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">
              {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
                invoice.createdAt
              )}
            </TableCell>
            <TableCell className="text-right">
              <InvoiceActions id={invoice.id} status={invoice.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
