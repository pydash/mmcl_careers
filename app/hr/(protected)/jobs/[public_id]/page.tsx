"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useJobDetails } from "@/hooks/hr/jobs/useJobDetails";

import { getDate } from "@/lib/datetime.helpers";
import { getPesoCurrency } from "@/lib/currency.helpers";

export default function JobDetailsPage() {
  const params = useParams<{ public_id: string }>();
  const publicId = params?.public_id;

  if (!publicId || Array.isArray(publicId)) {
    return <div className="p-6 text-red-600">Invalid job id.</div>;
  }

  const { details, loading, error } = useJobDetails(publicId);

  if (loading) {
    return (
      <div className="p-6 text-muted-foreground">Loading job details...</div>
    );
  }

  if (error) {
    return <div className="p-6 text-destructive">Error: {error}</div>;
  }

  if (!details) {
    return <div className="p-6 text-muted-foreground">Job not found.</div>;
  }

  const isClosed = String(details.status).toLowerCase() === "closed";

  return (
    <main>
      <div className="space-y-6">
        <Link
          href="/hr/jobs"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to jobs
        </Link>

        <section className="border border-slate-200 bg-white p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="inline-block bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              {details.department || "Unassigned"}
            </span>
            <span
              className={`inline-block px-2 py-1 text-xs font-medium ${
                isClosed
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {details.status || "Unknown"}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {details.title}
          </h1>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <article className="border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                Description
              </h2>
              <p className="whitespace-pre-wrap text-slate-700">
                {details.description || "No description provided."}
              </p>
            </article>

            <article className="border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                Responsibilities
              </h2>
              <p className="whitespace-pre-wrap text-slate-700">
                {details.responsibilities || "No responsibilities listed."}
              </p>
            </article>

            <article className="border border-slate-200 bg-white p-6">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                Requirements
              </h2>
              <p className="whitespace-pre-wrap text-slate-700">
                {details.requirements || "No requirements listed."}
              </p>
            </article>
          </section>

          <aside className="h-fit border border-slate-200 bg-white p-6">
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500">Job Type</p>
                <p className="font-semibold text-slate-900">
                  {details.employment_type || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Salary</p>
                <p className="font-semibold text-slate-900">
                  {getPesoCurrency(details.salary)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Posted by</p>
                <p className="font-semibold text-slate-900">
                  {details.posted_by || "Unknown"}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Date Posted</p>
                <p className="font-semibold text-slate-900">
                  {getDate(details.created_at)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Application Deadline</p>
                <p className="font-semibold text-slate-900">
                  {getDate(details.expiry_date)}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Applications</p>
                <p className="font-semibold text-slate-900">
                  {details.application_count ?? 0}
                </p>
              </div>

              <div>
                <Link
                  href={`/hr/jobs/${publicId}/applications`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Applications
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
