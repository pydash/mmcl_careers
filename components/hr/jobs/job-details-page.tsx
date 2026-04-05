"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, DollarSign, Users, Briefcase } from "lucide-react";
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
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
          <p className="text-sm font-medium text-slate-600">Loading details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">Error</p>
          <p className="text-sm text-slate-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500 font-medium">Job not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 lg:ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Job Board
          </Link>

          {/* Header Card */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 mt-12 lg:mt-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700">
                    {job.department}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      job.is_open ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    <div className={`size-1.5 rounded-full ${job.is_open ? "bg-green-500" : "bg-slate-500"}`} />
                    {job.is_open ? "Status: Open" : "Status: Closed"}
                  </span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 md:text-4xl tracking-tight">
                  {job.position}
                </h1>
                <div className="flex items-center gap-2 text-slate-500">
                   <Briefcase className="h-4 w-4" />
                   <p className="text-sm font-medium">{job.employment_type}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Description Area */}
            <section className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-4 text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
                  Job Description
                </h2>
                <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {job.description || "No description provided for this position."}
                </div>
              </article>
            </section>

            {/* Sidebar Info */}
            <aside className="space-y-4 lg:sticky lg:top-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Stats</h3>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Posted On</p>
                      <p className="text-sm font-bold text-slate-900">{new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-red-500 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Application Deadline</p>
                      <p className="text-sm font-bold text-slate-900">
                        {new Date(job.expiration_date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Salary Range</p>
                      <p className="text-sm font-bold text-slate-900">{job.salary || "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Users className="h-5 w-5 text-red-600 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Total Applicants</p>
                      <p className="text-lg font-black text-red-600">
                        {job.applications ?? 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Link href={`/jobs/${job.public_id}/applications`} className="w-full">
                    <Button className="w-full bg-red-600 hover:bg-red-700 h-11 font-bold">
                      View Applications
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full h-11 border-slate-200">
                    Edit Job Posting
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}