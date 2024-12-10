import DashboardBlocks from "@/components/DashboardBlocks";
import { InvoiceGraph } from "@/components/InvoiceGraph";
import { RecentInvoices } from "@/components/RecentInvoices";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { EmptyState } from "@/components/EmptyState";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}
export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.length < 1 ? (
        <EmptyState
          title="No Invoices Found"
          description="Get started by creating an invoice. It's quick and easy."
          buttontext="Create Invoice"
          href="/dashboard/invoices/create"
        />
      ) : (
        <>
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardBlocks />
            <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
              <InvoiceGraph />
              <RecentInvoices />
            </div>
          </Suspense>
        </>
      )}
    </>
  );
}
