"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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

import { logout as logoutService } from "@/services/auth.service";
import { Button } from "../ui/button";

export default function ApplicantNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const rootPath = `/${pathname.split("/")[1]}`;

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await logoutService();

      if (result.success) {
        router.push("/login");
      }
    } catch (error) {
      alert("Logout failed");
    }
  };

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/jobs",
      label: "Jobs",
      icon: Briefcase,
    },
    {
      href: "/applications",
      label: "Applications",
      icon: FileText,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* DESKTOP NAVBAR >= md */}
      <aside className="hidden md:flex fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 p-4 flex-col">
        <Link href="/" className="mb-6 flex items-center space-x-2">
          <div className="flex items-center gap-1">
            <Image src="/logo_block.png" height={40} width={40} alt="logo" />
            <Image src="/hrmo_logo.png" height={40} width={40} alt="logo2" />
          </div>

          <div className="bg-red-600 w-0.5 h-8"></div>

          <span className="text-xl font-semibold ml-1">Careers</span>
        </Link>

        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  rootPath === item.href
                    ? "bg-red-600 text-white font-medium"
                    : "text-gray-600 hover:bg-red-100 hover:text-gray-900"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </nav>
      </aside>

      {/* MOBILE NAVBAR < md */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-gray-50 border-b border-gray-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo_block.png" height={32} width={32} alt="logo" />
            <Image src="/hrmo_logo.png" height={32} width={32} alt="logo" />

            <span className="font-semibold text-lg ml-2">Careers</span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 hover:bg-gray-100 transition"
          >
            {open ? (
              <X className="w-6 h-6" />
            ) : (
              <div className="flex flex-col gap-2">
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
              </div>
            )}
          </button>
        </div>

        {/* Dropdown Menu */}
        {open && (
          <nav className="border-t border-gray-200 bg-white px-4 py-3 space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                    rootPath === item.href
                      ? "bg-red-600 text-white font-medium"
                      : "text-gray-600 hover:bg-red-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start gap-3 text-gray-600 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </Button>
          </nav>
        )}
      </header>
    </>
  );
}
