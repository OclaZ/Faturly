"use client";

import Image from "next/image";
import Link from "next/link";
import { Socials } from "./Socials";

export default function Footer() {
  const footerSections = [
    {
      title: "Faturly",
      links: ["Why faturly", "Features", "How it works", "Pricing"],
    },
    {
      title: "Contact us",
      links: ["Contact"],
    },
    {
      title: "Legal",
      links: ["Terms of service", "Privacy policy"],
      showSocials: true,
    },
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logoo.svg"
              alt="Logo"
              width={200}
              height={100}
              className="mb-4"
            />
            <p className="text-sm text-gray-400">© 2024 Faturly</p>
          </div>
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
              {section.showSocials && (
                <div className="mt-6">
                  <Socials />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
