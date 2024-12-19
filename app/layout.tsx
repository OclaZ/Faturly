import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const kanit = Kanit({
  subsets: ["latin"],
  variable: "--font-kanit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Faturly",
  description: "Invoice Management Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kanit.variable} font-sans`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
