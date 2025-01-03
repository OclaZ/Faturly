import { ReactNode } from "react";
import { requireUser } from "../utils/hooks";
import Link from "next/link";
import Image from "next/image";
import { DashboardLinks } from "@/components/DashboardLinks";
import { SocialLinks } from "@/components/SocialLinks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, User2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "../utils/auth";
import prisma from "../utils/db";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

async function getUser(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { firstName: true, lastName: true, address: true },
  });
  if (!data?.firstName || !data?.lastName || !data?.address) {
    redirect("/onboarding");
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();
  const data = await getUser(session.user?.id as string);
  return (
    <>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className=" border-r bg-muted/40 md:block flex flex-col h-full">
          <div className="flex flex-col h-full">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href={"/"} className="flex items-center ">
                <Image
                  src="/logoo black.svg"
                  alt="logo"
                  width={250}
                  height={200}
                  className="mx-auto mb-4"
                />
              </Link>
            </div>
            <div className="flex-1 overflow-hidden">
              <nav className="grid w-full gap-2 items-start px-2 text-sm font-medium lg:px-4 h-full overflow-y-auto">
                <DashboardLinks />
              </nav>
            </div>
            <div className="mt-auto border-t py-4">
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetTitle></SheetTitle>
              <SheetContent side="left">
                <nav className="grid gap-2 mt-2">
                  <Image
                    src="/logoo black.svg"
                    alt="logo"
                    width={200}
                    height={100}
                    className="mx-auto mb-4"
                  />
                  <DashboardLinks />
                  <div className="mt-auto">
                    <SocialLinks />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="flex items-center ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="rounded-full "
                    variant={"outline"}
                    size={"icon"}
                  >
                    <User2Icon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/invoices">Invoices</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <LogOut className="mr-1 size-4 text-red-500" />
                      <button
                        className="w-full text-left text-red-500"
                        type="submit"
                      >
                        Log Out
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
