import DashboardBlocks from "@/components/DashboardBlocks";
import { InvoiceGraph } from "@/components/InvoiceGraph";
import { RecentInvoices } from "@/components/RecentInvoices";
import prisma from "../utils/db";
import { requireUser } from "../utils/hooks";
import { EmptyState } from "@/components/EmptyState";
import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import WordPullUp from "@/components/ui/word-pull-up";

async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      fromName: true,
    },
  });

  return data;
}
async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, address: true, email: true },
  });
  return user;
}
export default async function DashboardRoute() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);
  const user = await getUser(session.user?.id as string);

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
            <WordPullUp
              className="text-3xl mx-0 font-semibold tracking-tight  text-black flex"
              words={"👋 Welcome back " + user?.firstName + " ."}
            ></WordPullUp>
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
