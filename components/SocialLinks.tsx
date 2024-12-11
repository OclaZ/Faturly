import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-4">
      <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
        <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
      </Link>
      <Link
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900" />
      </Link>
      <Link
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin className="h-5 w-5 text-gray-600 hover:text-gray-900" />
      </Link>
    </div>
  );
}
