"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useJob } from "@/hooks/applicant/useJob";
import { getDate } from "@/lib/datetime.helpers";

import { ChevronLeft } from "lucide-react";

export default function ApplicantJobPage() {
  const params = useParams<{ id: string }>();
  const { job, loading, error } = useJob(params.id);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-sm text-gray-500">Loading job...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-sm text-gray-500">Job not found.</p>
      </div>
    );
  }

  return (
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
            {job.employment_type || "-"}
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

        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <section className="border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h2>

            <div className="text-sm text-gray-700 whitespace-pre-line">
              {job.description || "No description provided."}
            </div>
          </section>

          <section className="border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Responsibilities
            </h2>

            <div className="text-sm text-gray-700 whitespace-pre-line">
              {job.responsibilities || "No responsibilities provided."}
            </div>
          </section>

          <section className="border border-gray-300 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Requirements
            </h2>

            <div className="text-sm text-gray-700 whitespace-pre-line">
              {job.requirements || "No requirements provided."}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside>
          <div className="border border-gray-300 bg-white p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Job Details
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Department</p>
                <p className="font-medium text-gray-900">
                  {job.department || "-"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Employment Type</p>
                <p className="font-medium text-gray-900">
                  {job.employment_type || "-"}
                </p>
              </div>

              {job.teaching_type && (
                <div>
                  <p className="text-gray-500 mb-1">Teaching Type</p>
                  <p className="font-medium text-gray-900">
                    {job.teaching_type}
                  </p>
                </div>
              )}

              <div>
                <p className="text-gray-500 mb-1">Open Until</p>
                <p className="font-medium text-gray-900">
                  {getDate(job.expiry_date)}
                </p>
              </div>

              {job.salary && (
                <div>
                  <p className="text-gray-500 mb-1">Salary</p>
                  <p className="font-medium text-gray-900">{job.salary}</p>
                </div>
              )}
            </div>

            {job.status === "Open" && (
              <Link href={`/jobs/${params.id}/apply`}>
                <button
                  type="button"
                  className="w-full mt-6 bg-blue-950 text-white px-6 py-3 text-sm hover:bg-blue-900"
                >
                  Apply Now
                </button>
              </Link>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
