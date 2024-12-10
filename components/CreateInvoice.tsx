"use client";

import { useActionState, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { CalendarIcon, Search } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButtons";
import { createInvoice } from "@/app/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { InvoiceSchema } from "@/app/utils/zodSchemas";
import { currencyData, formatCurrency } from "@/app/utils/formatCurrency";

interface iAppProps {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}
export function CreateInvoice({
  firstName,
  lastName,
  address,
  email,
}: iAppProps) {
  const [filter, setFilter] = useState("");
  const filteredCurrencies = currencyData.filter(
    (currency) =>
      currency.name.toLowerCase().includes(filter.toLowerCase()) ||
      currency.code.toLowerCase().includes(filter.toLowerCase())
  );
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: InvoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [selectedCurrency, setSelectedCurrency] = useState("MAD");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const CalculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);
  console.log(CalculateTotal);
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
          <Input
            type="hidden"
            name={fields.date.name}
            value={selectedDate.toISOString()}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
          <Input
            type="hidden"
            name={fields.total.name}
            value={CalculateTotal}
          />
          <div className="grid gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                placeholder="Test 123"
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
              />
              <p className="text-sm text-red-500 ">
                {fields.invoiceName.errors}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                  #
                </span>
                <Input
                  className="rounded-l-none"
                  type="number"
                  placeholder="123456..."
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={fields.invoiceNumber.initialValue}
                />
              </div>
              <p className="text-sm text-red-500 ">
                {fields.invoiceNumber.errors}
              </p>
            </div>
            <div>
              <Label>Currency</Label>
              <Select
                defaultValue="MAD"
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setSelectedCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <div className="flex items-center px-3 pb-2">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Input
                      placeholder="Search currency..."
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    />
                  </div>
                  {filteredCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center">
                        <span className="mr-2">{currency.flag}</span>
                        {currency.name} -- {currency.code}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500 ">{fields.currency.errors}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label>From :</Label>
              <div className="space-y-2">
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={firstName + " " + lastName}
                  placeholder="Your Name"
                />
                <p className="text-sm text-red-500 ">
                  {fields.fromName.errors}
                </p>
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={email}
                  placeholder="Your Email"
                />
                <p className="text-sm text-red-500 ">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={address}
                  placeholder="Your Address"
                />
                <p className="text-sm text-red-500 ">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            <div>
              <Label>To :</Label>
              <div className="space-y-2">
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.initialValue}
                  placeholder="Client Name"
                />
                <p className="text-sm text-red-500 ">
                  {fields.clientName.errors}
                </p>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                  placeholder="Client Email"
                />
                <p className="text-sm text-red-500 ">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
                  placeholder="Client Address"
                />
                <p className="text-sm text-red-500 ">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6 ">
            <div>
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) setSelectedDate(date); // Only update if a date is selected
                    }}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-sm text-red-500 ">{fields.date.errors}</p>
            </div>
            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={fields.dueDate.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on receipt</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500 ">{fields.dueDate.errors}</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  placeholder="Item name & description"
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={fields.invoiceItemDescription.initialValue}
                />
                <p className="text-sm text-red-500 ">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="0"
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-sm text-red-500 ">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  placeholder="00.00"
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-sm text-red-500 ">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  placeholder="00.00"
                  value={formatCurrency(CalculateTotal, selectedCurrency)}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>{formatCurrency(CalculateTotal, selectedCurrency)}</span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total ({selectedCurrency})</span>
                <span className="font-bold underline underline-offset-2">
                  {formatCurrency(CalculateTotal, selectedCurrency)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea
              placeholder="Add your Note/s right here ..."
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={fields.note.initialValue}
            />
          </div>
          <div className="flex items-center justify-end mt-6">
            <div>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
