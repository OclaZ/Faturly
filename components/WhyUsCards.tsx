"use client";

import {
  BarChart,
  CheckCircle,
  DollarSign,
  Send,
  Users,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
interface IconMapping {
  [key: string]: JSX.Element;
}

// Icon mapping object
const ICONS: IconMapping = {
  easy: <CheckCircle className="size-10" />,
  cost: <DollarSign className="size-10" />,
  collaborative: <Users className="size-10" />,
  secure: <Lock className="size-10" />,
  reports: <BarChart className="size-10" />,
  payments: <Send className="size-10" />,
};

interface Data {
  data: {
    key: string;
    title: string;
    description: string;
  }[];
}

export default function WhyeUsClient({ data }: Data) {
  return (
    <main className="relative flex flex-col items-center justify-center bg-white">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      ></motion.div>

      {/* Content */}
      <section className="relative flex w-full py-6 justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Why Choose Faturly?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col w-full items-center text-center space-y-2 p-4 border rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }} // Adds hover effect for scaling
                transition={{
                  duration: 0.5,
                  delay: index * 0.1, // Adds a staggered effect
                }}
              >
                {/* Render icon from ICONS mapping */}
                {ICONS[item.key]}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
