"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  FileText,
  Home,
  Settings,
  User,
  LogOut,
} from "lucide-react";

export default function HRNavbar() {
  const pathname = usePathname();
  const rootPath = `/${pathname.split("/")[1]}`;

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 p-4">
      <div className="mb-4 flex items-center justify-start gap-2">
        <Link href="/" className="inline-block">
          <img
            src="/logo_block.png"
            alt="MMCL Careers"
            className="h-10 w-auto object-contain"
          />
        </Link>
        <span className="text-lg font-semibold">MMCL Careers</span>
      </div>

      <nav className="space-y-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            rootPath === "/dashboard"
              ? "bg-red-50 text-red-700 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Home className="h-4 w-4" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/jobs"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            rootPath === "/jobs"
              ? "bg-red-50 text-red-700 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span>Jobs</span>
        </Link>

        <Link
          href="/applications"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            rootPath === "/applications"
              ? "bg-red-50 text-red-700 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Applications</span>
        </Link>

        <Link
          href="/profile"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            rootPath === "/profile"
              ? "bg-red-50 text-red-700 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
            rootPath === "/settings"
              ? "bg-red-50 text-red-700 font-medium"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Link>

        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
