import prisma from "@/app/utils/db";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { requireUser } from "@/app/utils/hooks";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Link from "next/link";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 7,
  });
  return data;
}
export async function RecentInvoices() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {data.map((item) => (
          <Link key={item.id} href={`/api/invoice/${item.id}`} target="_blank">
            <div
              key={item.id}
              className="flex items-center gap-4  rounded-lg p-4 hover:bg-muted/50 "
            >
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>{item.clientName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {item.clientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {item.clientEmail}
                </p>
              </div>
              <div className="ml-auto font-medium">
                + {formatCurrency(item.total, item.currency)}
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
