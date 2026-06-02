"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NotPermittedPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="border border-gray-300 bg-white p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="bg-red-600 text-white text-xs px-2 py-1">
            ACCESS RESTRICTED
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>

        <p className="text-sm text-gray-700 mb-6">
          You do not have permission to view this page.
        </p>
      </div>
    </main>
  );
}
