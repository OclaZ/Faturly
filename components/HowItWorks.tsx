"use client";
import { motion } from "framer-motion";

export function HowItWorks() {
  return (
    <main className="relative flex flex-col items-center justify-center">
      {/* Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
      ></motion.div>

      {/* Content */}
      <section className="relative flex w-full py-12 justify-center">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            How It Works
          </h2>
          <p className="text-lg text-zinc-600 mb-12">
            Our app is packed with features designed to save you time, improve
            efficiency, and ensure the best experience for you and your clients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your Faturly account in minutes.",
              },
              {
                step: 2,
                title: "Set Up Your Business",
                description:
                  "Add your business details and customize your invoice template.",
              },
              {
                step: 3,
                title: "Start Invoicing",
                description:
                  "Create and send professional invoices to your clients.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center space-y-4 p-6 border rounded-lg  shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }} // Adds hover effect for scaling
                transition={{
                  duration: 0.5,
                  delay: index * 0.1, // Adds a staggered effect
                }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-2">
                  {item.step}
                </div>
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
