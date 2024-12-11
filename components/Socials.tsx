"use client";

import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
  },
];

export function Socials() {
  return (
    <div className="flex items-center space-x-4">
      {socialLinks.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors mt-4"
          aria-label={`Visit our ${social.name}`}
        >
          <social.icon className="w-5 h-5" />
        </Link>
      ))}
    </div>
  );
}
