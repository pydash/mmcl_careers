"use client";

import PublicFooter from "@/components/public-footer";
import PublicNavbar from "@/components/public-navbar";
import Link from "next/link";

import { useJobs } from "@/hooks/public/useJobs";

import { getDate } from "@/lib/datetime.helpers";

export default function PublicJobsPage() {
  const { jobs, loading, error } = useJobs();

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
          <p className="text-sm text-gray-500">Loading job...</p>
        </div>
        <PublicFooter />
      </>
    );
  }
  return (
    <>
      <PublicNavbar />

      <main className="bg-gray-50 min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold text-gray-900">Join Our Team</h1>

            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore exciting career opportunities and become part of a team
              that values innovation, collaboration, and growth.
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs?.map((job, index) => (
              <Link
                href={`/jobs/${job?.public_id}`}
                key={index}
                className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-xs font-medium px-3 py-1 ${
                      job?.employment_type === "Full Time"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {job?.employment_type}
                  </span>

                  <span className="text-xs text-gray-500">
                    Apply until: {getDate(job?.expiry_date)}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900">
                  {job?.title}
                </h2>

                <p className="text-sm mt-2 text-gray-600">{job?.department}</p>

                <button className="text-xs mt-6 w-full bg-blue-950 hover:bg-blue-900 text-white font-medium py-3 transition">
                  View Details
                </button>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}
