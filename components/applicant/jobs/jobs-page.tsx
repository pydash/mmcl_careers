"use client";

import { useState } from "react";
import { useJobs } from "@/hooks/applicant/useJobs";
import { getDate } from "@/lib/datetime.helpers";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ApplicantJobsPage() {
  // Filters
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  // Pagination
  const [page, setPage] = useState(1);

  // Fetch jobs
  const { data, loading, error, totalPages } = useJobs({
    search,
    department,
    status,
    page,
    limit: 8,
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search */}
        <div className="md:col-span-8">
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-950"
          />
        </div>

        {/* Status */}
        <div className="md:col-span-2">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none focus:border-blue-950"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Department */}
        <div className="md:col-span-2">
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(1);
            }}
            className="w-full border border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none focus:border-blue-950"
          >
            <option value="">All Departments</option>
            <option value="CCIS">CCIS</option>
            <option value="SHS">SHS</option>
            <option value="MITL">MITL</option>
            <option value="CAS">CAS</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && <div className="text-sm text-gray-500">Loading jobs...</div>}

      {/* Error */}
      {error && <div className="text-sm text-red-500">{error}</div>}

      {/* Empty State */}
      {!loading && !data && (
        <div className="text-sm text-gray-500">No jobs found.</div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.jobs.map((job, index) => (
          <div
            key={index}
            className="border border-gray-300 bg-white p-4 flex flex-col justify-between hover:bg-gray-50 transition"
          >
            {/* Top */}
            <div>
              {/* Badges */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <div className="bg-red-600 text-white text-xs px-2 py-1">
                  {job.department || "-"}
                </div>

                <div className="bg-red-600 text-white text-xs px-2 py-1">
                  {job.employment_type}
                </div>

                <div
                  className={`text-xs px-2 py-1 ${
                    job.status === "Open"
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {job.status}
                </div>
              </div>

              {/* Job Info */}
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-gray-900">
                  {job.title}
                </h3>

                <p className="text-xs text-gray-500">
                  Open Until: {getDate(job.expiry_date)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-300 flex items-center justify-end">
              {job.status === "Closed" ? (
                <button
                  disabled
                  className="bg-gray-400 text-white text-sm py-2 px-4 cursor-not-allowed opacity-70"
                >
                  Closed
                </button>
              ) : (
                <Link
                  href={`/jobs/${job.public_id}`}
                  className="bg-blue-950 text-white text-sm py-2 px-4 hover:bg-blue-900"
                >
                  View Details
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-start gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="border disabled:opacity-50 not-disabled:hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="border disabled:opacity-50 not-disabled:hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
