"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Jobs", href: "/jobs" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex items-center"
        >
          <Image
            src="/logo_horizontal.png"
            alt="MMCL Careers"
            width={120}
            height={20}
            className="object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? "text-red-700 font-semibold"
                  : "hover:text-red-700 transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2">
            <Button asChild size="sm" variant="outline">
              <Link href="/get-started">Get Started</Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-900">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
