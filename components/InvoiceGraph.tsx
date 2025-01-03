import prisma from "@/app/utils/db";
import { Graph } from "./Graph";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { requireUser } from "@/app/utils/hooks";

async function getData(userId: string) {
  const rawData = await prisma.invoice.findMany({
    where: {
      userId: userId,
      status: "PAID",
      createdAt: {
        lte: new Date(),
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    select: {
      date: true,
      total: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const AggregatedData = rawData.reduce(
    (acc: { [key: string]: number }, curr) => {
      const date = new Date(curr.date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      acc[date] = (acc[date] || 0) + curr.total;
      return acc;
    },
    {}
  );
  const transformedData = Object.entries(AggregatedData)
    .map(([date, amount]) => ({
      date,
      amount,
      originalDate: new Date(date + "," + new Date().getFullYear()),
    }))
    .sort((a, b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({ date, amount }) => ({
      date,
      amount,
    }));
  return transformedData;
}

export async function InvoiceGraph() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Paid Invoices</CardTitle>
        <CardDescription>
          {" "}
          Invoices that have been paid in the last 30 days
        </CardDescription>
        <CardContent>
          <Graph data={data} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
