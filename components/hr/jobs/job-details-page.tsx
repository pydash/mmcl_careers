"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import useJobDetails from "@/hooks/jobs/useJobDetails";
import { Job } from "@/models/job";

type JobDetailsData = Job & {
  applications?: number;
};

export default function HRJobDetailsPage({ id }: { id: string }) {
  const { job, loading, error } = useJobDetails(id) as {
    job: JobDetailsData;
    loading: boolean;
    error: Error | null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                    {job.department}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 w-fit rounded-full px-3 py-1 text-xs font-medium ${job.is_open ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    <div
                      className={`size-1.5 rounded-xl ${job.is_open ? "bg-green-500" : "bg-gray-500"}`}
                    />
                    {job.is_open ? "Open" : "Closed"}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  {job.position}
                </h1>
                <p className="text-sm text-slate-600">{job.employment_type}</p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  Job Description
                </h2>
                <p className="leading-relaxed text-slate-700">
                  {job.description || "No description available."}
                </p>
              </article>
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <div className="mb-6 space-y-2 rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Posted</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(job.created_at).toLocaleDateString()}
                </p>
                <p className="pt-2 text-sm text-slate-600">
                  Application Deadline
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(job.expiration_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-slate-600">Salary Range</p>
                <p className="text-sm font-semibold text-slate-900">
                  {job.salary || "Not specified"}
                </p>
                <p className="pt-2 text-sm text-slate-600">Applications</p>
                <p className="text-sm font-semibold text-red-600">
                  {job.applications ?? 0}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Edit Job
                </Button>
                <Link
                  href={`/jobs/${job.public_id}/applications`}
                  className="flex-1"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    View Applications
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
