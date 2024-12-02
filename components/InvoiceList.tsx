import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import InvoiceActions from "./InvoiceActions";

const InvoiceList = () => {
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
        <TableRow>
          <TableCell className="font-medium">INV-001</TableCell>
          <TableCell className="font-medium">John Doe</TableCell>
          <TableCell className="font-medium">$1000.00 </TableCell>
          <TableCell className="font-medium">Pending</TableCell>
          <TableCell className="font-medium">01/01/2024</TableCell>
          <TableCell className="text-right">
            <InvoiceActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default InvoiceList;
