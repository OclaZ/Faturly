import { z } from "zod";
export const OnboardingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters *"),
  lastName: z.string().min(2, "Last name must be at least 2 characters *"),
  address: z.string().min(2, "Address must be at least 2 characters *"),
});

export const InvoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice name is required *"),
  total: z.number().min(1, "Total is required *"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is required *"),
  dueDate: z.number().min(0, "Due date is required *"),
  fromName: z.string().min(1, "Your name is required *"),
  fromEmail: z
    .string()
    .email("Your email is invalid *")
    .min(1, "Your email is required *"),
  fromAddress: z.string().min(1, "Your address is required *"),
  clientName: z.string().min(1, "Client name is required *"),
  clientEmail: z
    .string()
    .email("Client email is invalid *")
    .min(1, "Client email is required *"),
  clientAddress: z.string().min(1, "Client address is required *"),
  currency: z.string().min(1, "Currency is required *"),
  invoiceNumber: z.number().min(1, "Invoice number is required *"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Item description is required *"),
  invoiceItemQuantity: z.number().min(1, "Item quantity at least 1 *"),
  invoiceItemRate: z.number().min(1, "Item rate is required *"),
});
