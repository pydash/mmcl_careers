"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  Home,
  Settings,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplicantNavbar() {
  const pathname = usePathname();
  const rootPath = `/${pathname.split("/")[1]}`;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/applications", label: "Applications", icon: FileText },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
     
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <img
            src="/logo_block.png"
            alt="MMCL Careers"
            className="h-8 w-auto object-contain"
          />
          <span className="text-sm font-semibold">MMCL Careers</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 p-4 transition-transform lg:translate-x-0 lg:w-64 ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-start gap-2">
          <Link href="/" className="inline-block" onClick={() => setIsOpen(false)}>
            <img
              src="/logo_block.png"
              alt="MMCL Careers"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <span className="text-lg font-semibold text-slate-900">MMCL Careers</span>
        </div>

        <nav className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = rootPath === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-red-50 text-red-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}