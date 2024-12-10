import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";

export function InvoiceTableSkeleton() {
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
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-20" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-32" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-24" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-6 w-16 rounded-full" />
            </TableCell>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-28" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-8 w-20 ml-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
