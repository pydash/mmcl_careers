"use client";

import { useMemo, useState } from "react";
import { useApplications } from "@/hooks/applicant/useApplications";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getDate } from "@/lib/datetime.helpers";

export default function ApplicantApplicationsPage() {
  const { applications, loading, error } = useApplications();

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // adjust as needed
  const totalPages = Math.ceil((applications?.length || 0) / itemsPerPage);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-50 text-green-600";
      case "Interview":
        return "bg-blue-50 text-blue-600";
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Rejected":
        return "bg-red-50 text-red-600";
      case "Cancelled":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // Slice applications for current page
  const paginatedApplications = useMemo(() => {
    if (!applications) return [];
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return applications.slice(start, end);
  }, [applications, page]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-8">
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-blue-950"
          />
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedApplications.map((application) => (
          <div
            key={application.id}
            className="border border-gray-300 bg-white p-4 flex flex-col justify-between hover:bg-gray-50 transition"
          >
            <div className="mb-4 space-x-2  ">
              <div
                className={`text-xs px-2 py-1 inline-block bg-red-600 text-white`}
              >
                {application.department}
              </div>
              <div
                className={`text-xs px-2 py-1 inline-block ${getStatusStyle(application.status)}`}
              >
                {application.status}
              </div>
            </div>

            <div className="space-y-2 mb-2">
              <h3 className="text-xl font-semibold">{application.title}</h3>
              <p className="text-xs">
                Date Applied: {getDate(application.created_at)}
              </p>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-3 border-t border-gray-300 flex justify-end">
              <Link
                href={`/applications/${application.id}`}
                className="bg-blue-950 text-white text-sm py-2 px-4 hover:bg-blue-900"
              >
                View Application
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-start gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="border disabled:opacity-50 hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="border disabled:opacity-50 hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
