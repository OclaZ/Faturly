import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function RecentInvoices() {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="hidden sm:flex size-9">
            <AvatarFallback>HA</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">HAMZA ASLIKH</p>
            <p className="text-sm text-muted-foreground">aslikh@gmail.com</p>
          </div>
          <div className="ml-auto font-medium">+500.00$</div>
        </div>
      </CardContent>
    </Card>
  );
}
