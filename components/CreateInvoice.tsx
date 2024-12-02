"use client";
import { useState } from "react";
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
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButtons";

const currencyData = [
  { code: "MAD", name: "Moroccan Dirham", flag: "🇲🇦" },
  { code: "USD", name: "United States Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound Sterling", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰" },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];

const CreateInvoice = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="grid gap-1 w-fit mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Draft</Badge>
            <Input placeholder="Test 123" />
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <Label>Invoice No.</Label>
            <div className="flex">
              <span className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                #
              </span>
              <Input className="rounded-l-none" placeholder="123456..." />
            </div>
          </div>
          <div>
            <Label>Currency</Label>
            <Select defaultValue="MAD">
              <SelectTrigger>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyData.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    <span className="flex items-center">
                      <span className="mr-2">{currency.flag}</span>
                      {currency.name} -- {currency.code}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label>From :</Label>
            <div className="space-y-2">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Your Address" />
            </div>
          </div>
          <div>
            <Label>To :</Label>
            <div className="space-y-2">
              <Input placeholder="Client Name" />
              <Input placeholder="Client Email" />
              <Input placeholder="Client Address" />
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
                  className="w-[200px] text-left justify-start"
                >
                  <CalendarIcon />
                  {selectedDate ? (
                    new Intl.DateTimeFormat("en-US", {
                      dateStyle: "long",
                    }).format(selectedDate)
                  ) : (
                    <span>Select Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label>Invoice Due</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select due date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on receipt</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
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
              <Textarea placeholder="Item name & description" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="0" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="00.00" />
            </div>
            <div className="col-span-2">
              <Input type="number" placeholder="00.00" disabled />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>00.00$</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span>Total (USD)</span>
              <span className="font-bold underline underline-offset-2">
                00.00$
              </span>
            </div>
          </div>
        </div>
        <div>
          <Label>Notes</Label>
          <Textarea placeholder="Add your Note/s right here ..." />
        </div>
        <div className="flex items-center justify-end mt-6">
          <div>
            {" "}
            <SubmitButton text="Send Invoice to Client" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateInvoice;
