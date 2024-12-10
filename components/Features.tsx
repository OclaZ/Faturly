"use client";
import { motion } from "framer-motion";

export function Features() {
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
      <section className="relative flex w-full py-12 justify-center">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Powerful Features to Simplify Your Workflow
          </h2>
          <p className="text-lg text-zinc-600 mb-12">
            Our app is packed with features designed to save you time, improve
            efficiency, and ensure the best experience for you and your clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Authentication",
                description:
                  "Secure login using Auth.js with Magic Links, ensuring safe access for all users.",
              },
              {
                title: "PDF Invoicing",
                description:
                  "Generate professional invoices as PDFs with JsPDF, ready for easy sharing.",
              },
              {
                title: "Email Integration",
                description:
                  "Send invoices and updates to clients using Mailtrap, streamlining your communication.",
              },
              {
                title: "Database Management",
                description:
                  "Store and manage all invoice-related data in PostgreSQL, ensuring security and scalability.",
              },
              {
                title: "Overdue Reminders",
                description:
                  "Automate email reminders for overdue payments, helping you get paid faster.",
              },
              {
                title: "Mobile-Responsive Design",
                description:
                  "Optimized for all screen sizes and devices, providing a seamless experience everywhere.",
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
                <h3 className="text-2xl font-semibold text-primary-600">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
    </main>
  );
}
