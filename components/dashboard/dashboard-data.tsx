import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { DashboardCardsClient } from "./dashboard-cards-client";

// Add more currencies as needed
const currencies = ["MAD", "USD", "EUR", "GBP"];

async function getData(userId: string) {
  const [invoices, pendingInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: { userId: userId },
      select: { total: true },
    }),
    prisma.invoice.count({
      where: { userId: userId, status: "PENDING" },
    }),
    prisma.invoice.count({
      where: { userId: userId, status: "PAID" },
    }),
  ]);

  const totalRevenue = invoices.reduce(
    (sum, invoice) => sum + (invoice.total || 0),
    0
  );

  // Simulate currency conversion (replace with actual API call in production)
  const exchangeRates = {
    MAD: 1,
    USD: 0.1,
    EUR: 0.092,
    GBP: 0.079,
  };

  const currencyTotals = currencies.map((currency) => ({
    currency,
    total: totalRevenue * exchangeRates[currency as keyof typeof exchangeRates],
  }));

  return {
    currencyTotals,
    invoicesIssued: invoices.length,
    paidInvoices,
    pendingInvoices,
  };
}

export async function DashboardData() {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  // Pass the data as a stringified prop to the client component
  return <DashboardCardsClient data={JSON.stringify(data)} />;
}
