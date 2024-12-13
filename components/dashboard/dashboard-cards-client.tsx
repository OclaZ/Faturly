"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  FilesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatCurrency } from "@/app/utils/formatCurrency";

interface DashboardData {
  currencyTotals: Array<{ currency: string; total: number }>;
  invoicesIssued: number;
  paidInvoices: number;
  pendingInvoices: number;
}

export function DashboardCardsClient({ data }: { data: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const parsedData: DashboardData = JSON.parse(data);

  const nextCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === parsedData.currencyTotals.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? parsedData.currencyTotals.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      <div className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "damping", stiffness: 300, damping: 30 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium leading-none tracking-tight">
                  Total Revenue
                </CardTitle>
                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <h2 className="text-2xl font-bold">
                  {formatCurrency(
                    parsedData.currencyTotals[currentIndex].total,
                    parsedData.currencyTotals[currentIndex].currency
                  )}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Based on the last 30 days
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
          onClick={prevCard}
          aria-label="Previous currency"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2"
          onClick={nextCard}
          aria-label="Next currency"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium leading-none tracking-tight">
            Invoices Issued
          </CardTitle>
          <FilesIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+ {parsedData.invoicesIssued}</h2>
          <p className="text-sm text-muted-foreground">Total invoices issued</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium leading-none tracking-tight">
            Paid Invoices
          </CardTitle>
          <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+ {parsedData.paidInvoices}</h2>
          <p className="text-sm text-muted-foreground">Total paid invoices</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium leading-none tracking-tight">
            Open Invoices
          </CardTitle>
          <ActivityIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">+ {parsedData.pendingInvoices}</h2>
          <p className="text-sm text-muted-foreground">Total open invoices</p>
        </CardContent>
      </Card>
    </div>
  );
}
