"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
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
        {/* Mobile menu button */}
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
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/." className="text-gray-600 hover:text-black text-lg">
            Why Faturly?
          </Link>
          <Link
            href="/agence"
            className="text-gray-600 hover:text-black text-lg"
          >
            Features
          </Link>
          <Link href="#" className="text-gray-600 hover:text-black text-lg">
            How It Works
          </Link>
          <Link href="#" className="text-gray-600 hover:text-black text-lg">
            Pricing
          </Link>
          <Link href="#" className="text-gray-600 hover:text-black text-lg">
            Contact Us
          </Link>
        </nav>
        <div className="hidden md:block">
          <Button className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-lg">
            Start for free
          </Button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="container mx-auto px-4 py-6">
            <Image
              src="/LOGO-BETA.svg"
              alt="logo"
              width={150}
              height={40}
              className="mx-auto mb-4"
            />
            <nav className="flex flex-col align-left gap-4 space-y-6">
              <Link
                href="/."
                className="text-gray-600 hover:text-black text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Choose Us?
              </Link>
              <Link
                href="/agence"
                className="text-gray-600 hover:text-black text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black  text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-black text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
            <Button
              className="bg-black text-white  hover:bg-gray-800 px-6 py-2 text-lg w-full max-w-xs mt-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Start for free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
