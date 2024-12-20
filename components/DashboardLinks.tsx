"use client";
import { cn } from "@/lib/utils";
import { FileText, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: FileText,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <div className="space-y-1">
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:bg-muted/50",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
        >
          <link.icon className="size-4" />
          <span>{link.name}</span>
        </Link>
      ))}
    </div>
  );
}
