"use client";

import Link from "next/link";
import PublicFooter from "@/components/public-footer";
import PublicNavbar from "@/components/public-navbar";

import { useParams } from "next/navigation";
import { useJob } from "@/hooks/public/useJob";

import { ChevronLeft } from "lucide-react";
import { getDate } from "@/lib/datetime.helpers";

export default function PublicJobPage() {
  const params = useParams<{ id: string }>();
  const { data, loading, error } = useJob(params.id);

  if (loading) {
    return (
      <>
        <PublicNavbar />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-sm text-gray-500">Loading job...</p>
        </div>
        <PublicFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <PublicNavbar />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-sm text-red-500">{error}</p>
        </div>
        <PublicFooter />
      </>
    );
  }

  if (!data) {
    return (
      <>
        <PublicNavbar />
        <div className="max-w-5xl mx-auto px-4 py-10">
          <p className="text-sm text-gray-500">Job not found.</p>
        </div>
        <PublicFooter />
      </>
    );
  }

  return (
    <>
      <PublicNavbar />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Back */}
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-950 mb-6"
        >
          <ChevronLeft size={16} />
          Back to Jobs
        </Link>

        {/* Header */}
        <div className="border border-gray-300 bg-white p-6 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-red-600 text-white text-xs px-2 py-1">
              {data.employment_type || "-"}
            </div>

            <div
              className={`text-xs px-2 py-1 ${
                data.status === "Open"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {data.status}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <section className="border border-gray-300 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Description
              </h2>

              <div className="text-sm text-gray-700 whitespace-pre-line">
                {data.description || "No description provided."}
              </div>
            </section>

            <section className="border border-gray-300 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Responsibilities
              </h2>

              <div className="text-sm text-gray-700 whitespace-pre-line">
                {data.responsibilities || "No responsibilities provided."}
              </div>
            </section>

            <section className="border border-gray-300 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Requirements
              </h2>

              <div className="text-sm text-gray-700 whitespace-pre-line">
                {data.requirements || "No requirements provided."}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="border border-gray-300 bg-white p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Job Details
              </h2>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Department</p>
                  <p className="font-medium text-gray-900">
                    {data.department || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Employment Type</p>
                  <p className="font-medium text-gray-900">
                    {data.employment_type || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Open Until</p>
                  <p className="font-medium text-gray-900">
                    {getDate(data.expiry_date)}
                  </p>
                </div>

                {data.salary && (
                  <div>
                    <p className="text-gray-500 mb-1">Salary</p>
                    <p className="font-medium text-gray-900">{data.salary}</p>
                  </div>
                )}
              </div>

              {data.status === "Open" && (
                <Link
                  href={`/register`}
                  className="mt-6 block w-full text-center bg-blue-950 text-white px-6 py-3 text-sm hover:bg-blue-900"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </aside>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
