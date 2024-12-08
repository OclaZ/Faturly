import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  FilesIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
async function getData(userId: string) {
  const [data, pendingInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: { userId: userId },
      select: { total: true },
    }),
    prisma.invoice.findMany({
      where: { userId: userId, status: "PENDING" },
      select: { id: true },
    }),
    prisma.invoice.findMany({
      where: { userId: userId, status: "PAID" },
      select: { id: true },
    }),
  ]);

  return [data, pendingInvoices, paidInvoices];
}
export default async function DashboardBlocks() {
  const session = await requireUser();
  const [data, pendingInvoices, paidInvoices] = await getData(
    session.user?.id as string
  );
  const dataWithTotal = data.filter((invoice) => "total" in invoice);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium leading-none tracking-tight">
            Total Revenue
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            $ {dataWithTotal.reduce((acc, invoice) => acc + invoice.total, 0)}
          </h2>
          <p className="text-sm text-muted-foreground">
            Based on the last 30 days
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium leading-none tracking-tight">
            Invoices Issued
          </CardTitle>
          <FilesIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">{data.length}</h2>
          <p className="text-sm text-muted-foreground">Total invoices issued</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium leading-none tracking-tight">
            Paid Invoices
          </CardTitle>
          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">{paidInvoices.length}</h2>
          <p className="text-sm text-muted-foreground">Total paid invoices</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className=" text-sm font-medium leading-none tracking-tight">
            Open Invoices
          </CardTitle>
          <ActivityIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">{pendingInvoices.length}</h2>
          <p className="text-sm text-muted-foreground">Total open invoices</p>
        </CardContent>
      </Card>
    </div>
  );
}
