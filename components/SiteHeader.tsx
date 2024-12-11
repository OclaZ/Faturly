"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <Link
          href="/"
          className="flex flex-row items-center space-x-0 space-y-0"
        >
          <Image
            src="/LOGO-BETA.svg"
            alt="logo"
            width={150}
            height={40}
            className="mx-auto mb-4"
          />
        </Link>
        <button
          className="md:hidden z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleScroll("why-us")}
            className="text-gray-600 hover:text-black text-lg"
          >
            Why Faturly?
          </button>
          <button
            onClick={() => handleScroll("features")}
            className="text-gray-600 hover:text-black text-lg"
          >
            Features
          </button>
          <button
            onClick={() => handleScroll("how-it-works")}
            className="text-gray-600 hover:text-black text-lg"
          >
            How It Works
          </button>
          <button
            onClick={() => handleScroll("pricing")}
            className="text-gray-600 hover:text-black text-lg"
          >
            Pricing
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="text-gray-600 hover:text-black text-lg"
          >
            Contact Us
          </button>
        </nav>
        <div className="hidden md:block">
          <Link href="/login">
            <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-lg">
              Start for free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
