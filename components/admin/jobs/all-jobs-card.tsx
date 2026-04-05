"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useAllJobs } from "@/hooks/hr/jobs/useAllJobs";
import { Calendar, Briefcase, Info } from "lucide-react";

export default function AllJobsCard() {
  const { jobs, loading, error } = useAllJobs();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm font-medium text-slate-500 animate-pulse">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {jobs.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-medium bg-white">
          <Briefcase className="h-8 w-8 mx-auto mb-3 text-slate-300" />
          No jobs available in the system.
        </div>
      ) : (
        jobs.map((job: any) => {
          const tags =
            Array.isArray(job.tags) && job.tags.length > 0
              ? job.tags
              : [job.department, job.employment_type].filter(Boolean);
          const href = `/admin/jobs/${job.public_id}`;

          return (
            <Link
              key={job.id}
              href={href}
              className="group w-full bg-white border border-slate-200 p-5 md:p-6 rounded-2xl shadow-sm transition-all hover:border-red-300 hover:shadow-md cursor-pointer active:scale-[0.99]"
              prefetch
            >
              <div className="flex mb-3 flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-100/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg md:text-xl font-black text-slate-900 group-hover:text-red-700 transition-colors leading-tight">
                {job.title}
              </h3>

              <Separator className="my-4 bg-slate-100" />

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm font-medium">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-slate-400">Posted:</span>
                  <span className="text-slate-900">
                    {job.date_posted
                      ? new Date(job.date_posted).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <Separator orientation="vertical" className="hidden sm:block h-4 bg-slate-200" />

                <div className="flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      job.is_active ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={`font-bold ${job.is_active ? "text-emerald-700" : "text-slate-500"}`}>
                    {job.is_active ? "OPEN" : "CLOSED"}
                  </span>
                </div>
                
                <div className="ml-auto hidden md:flex items-center gap-1 text-slate-400 group-hover:text-red-600 transition-colors">
                  <span className="text-[10px] font-black uppercase tracking-tighter">Manage</span>
                  <Info className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}