"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useAllJobs } from "@/hooks/hr/jobs/useAllJobs";

export default function ClosedJobsCard() {
  const { jobs, loading, error } = useAllJobs();

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error}</div>;
  }

  const closedJobs = jobs.filter((job: any) => job.is_active !== true);

  return (
    <div className="flex flex-col gap-4">
      {closedJobs.length === 0 ? (
        <div>No closed jobs available.</div>
      ) : (
        closedJobs.map((job: any) => {
          const tags =
            Array.isArray(job.tags) && job.tags.length > 0
              ? job.tags
              : [job.department, job.employment_type].filter(Boolean);
          const href = `/admin/jobs/${job.public_id}`;

          return (
            <Link
              key={job.id}
              href={href}
              className="w-full border border-gray-200 p-6 transition-colors block hover:border-gray-400 cursor-pointer"
              prefetch
            >
              <div className="flex mb-2 flex-wrap gap-2">
                {tags.map((tag: string, index: number) => (
                  <span
                    key={`${tag}-${index}`}
                    className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>
              <Separator className="my-2" />
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <p>
                  Apply until:{" "}
                  {job.expiry_date
                    ? new Date(job.expiry_date).toLocaleDateString()
                    : "N/A"}
                </p>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 shrink-0 rounded-full ${
                      job.is_active ? "bg-green-500" : "bg-red-500"
                    }`}
                    aria-hidden="true"
                  />
                  <p>{job.is_active ? "Open" : "Closed"}</p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
