"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import SubmitButton from "./SubmitButtons";
import {
  ArrowRightIcon,
  MousePointer2Icon,
  LayoutDashboardIcon,
  FileTextIcon,
} from "lucide-react";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { cn } from "@/lib/utils";
import Safari from "./ui/safari";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlurIn from "./ui/blur-in";
import { handleSignIn } from "@/app/actions";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side to avoid hydration mismatch
  }

  return (
    <main className="relative mt-20 flex flex-col items-center justify-center bg-white">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      ></motion.div>

      {/* Content */}
      <section className="relative flex w-full  py-6 md:py-6 lg:py-6 xl:py-6  justify-center">
        <div className="container max-w-screen-xl px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex  items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span className="flex items-center">
                  <Image
                    src="/icon.svg"
                    alt="logo"
                    width={30}
                    height={30}
                    className="mr-2"
                  />
                  Introducing Faturly
                </span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-100 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl relative"
            >
              The next gen of <br className="hidden sm:inline" />
              <span className="relative inline-block">
                <BlurIn
                  word="Invoice"
                  className=" text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl max-w-5xl relative"
                />
                <span className="absolute left-0 bottom-[-0.3rem] w-full h-2 bg-gradient-to-r from-gray-400 to-gray-800 rounded-md"></span>
              </span>{" "}
              Management .
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto max-w-[700px] text-zinc-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl dark:text-zinc-400"
            >
              Faturly is the engine that builds, scales and grows your business
              to the next level.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col justify-center items-center w-full py-10 px-4 relative"
            >
              <form
                action={handleSignIn}
                className="flex items-center gap-4 w-full max-w-2xl"
              >
                <Label className="w-1/2 text-md">Enter your email </Label>
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="example@ex.com"
                  className="flex-grow px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <div className="relative">
                  <SubmitButton
                    text="Get Started for Free"
                    variant={"default"}
                  />
                  <MousePointer2Icon className="absolute -bottom-6 -right-5 text-black w-9 h-9 animate-bounce-left" />
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="relative w-full mb-10 py-6 sm:py-8 md:py-12 flex justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="mx-auto  w-full max-w-screen-xl shadow-2xl">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full  items-center justify-center"
            >
              <TabsList className="flex flex-row w-full grid-cols-2 mb-4">
                <TabsTrigger
                  value="dashboard"
                  className="flex w-full items-center justify-center text-md"
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: activeTab === "dashboard" ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-row items-center justify-center"
                  >
                    <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </motion.div>
                </TabsTrigger>
                <TabsTrigger
                  value="invoices"
                  className="flex w-full items-center justify-center text-md"
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: activeTab === "invoices" ? 1.05 : 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center "
                  >
                    <FileTextIcon className="mr-2 h-4 w-4" />
                    Invoices
                  </motion.div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="relative rounded-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-md"
              >
                <Safari
                  url="faturly.online"
                  className="w-full h-full rounded-md shadow-2xl"
                  src={
                    activeTab === "dashboard"
                      ? "/screenshot.png"
                      : "/screenshot1.png"
                  }
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
