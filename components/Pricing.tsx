"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { CheckCircle } from "lucide-react";

export function Pricing() {
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
      <section className="relative flex w-full py-12 justify-center ">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Pricing
          </h2>
          <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col p-6 border rounded-lg bg-background">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-4">Free for now</div>
              <ul className="space-y-2 mb-6 flex-grow">
                {[
                  "Unlimited invoices",
                  "Advanced reports",
                  "Client portal",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center space-y-4 p-6 border  transition-transform duration-300 hover:scale-105 cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }} // Adds hover effect for scaling
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1, // Adds a staggered effect
                    }}
                  >
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  </motion.div>
                ))}
              </ul>
              <Button className="w-full">Choose Plan</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
