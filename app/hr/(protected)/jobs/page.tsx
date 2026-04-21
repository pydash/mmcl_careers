"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobViewButton } from "@/components/hr/jobs/job-view-button";
import { useAllJobs } from "@/hooks/hr/jobs/useAllJobs";
import { getDate } from "@/lib/datetime.helpers";

type JobItem = {
  id: number;
  public_id: string;
  title: string;
  date_posted?: string | null;
  total_applicants?: number | null;
  status?: "Open" | "Closed" | null;
};

function JobCard({ job }: { job: JobItem }) {
  const isOpen = Boolean(job.status === "Open");

  return (
    <Link
      href={`/hr/jobs/${job.public_id}`}
      className="w-full border border-gray-200 p-6 transition-colors hover:border-gray-400"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium ${
            isOpen ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isOpen ? "Open" : "Closed"}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>

      <Separator className="my-2" />

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          Posted on:{" "}
          <span className="text-gray-900">
            {getDate(job.date_posted ?? "")}
          </span>
        </p>
        <div className="flex items-center gap-3">
          <p>{job.total_applicants ?? 0} applicants</p>
          <JobViewButton jobId={job.id} />
        </div>
      </div>
    </Link>
  );
}

function JobCardsList({ jobsList }: { jobsList: JobItem[] }) {
  if (jobsList.length === 0) {
    return <div className="mt-4 text-muted-foreground">No jobs found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {jobsList.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default function JobsPage() {
  const [mounted, setMounted] = useState(false);
  const { jobs, loading, error } = useAllJobs();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const openJobs = jobs.filter((job: JobItem) => job.status === "Open");
  const closedJobs = jobs.filter((job: JobItem) => job.status !== "Open");

  return (
    <Tabs defaultValue="all">
      <div className="flex flex-col gap-4 border-b-2 border-b-muted pb-4 sm:flex-row sm:items-center">
        <TabsList className="bg-0">
          <TabsTrigger value="all" className="shadow-none!">
            All
          </TabsTrigger>
          <TabsTrigger value="open" className="shadow-none!">
            Open
          </TabsTrigger>
          <TabsTrigger value="closed" className="shadow-none!">
            Closed
          </TabsTrigger>
        </TabsList>

        <div className="sm:ml-auto">
          <Button variant="default" asChild>
            <Link href="/hr/jobs/post-a-job">Post a job</Link>
          </Button>
        </div>
      </div>

      <TabsContent value="all" className="mt-4">
        {loading && (
          <div className="text-muted-foreground">Loading jobs...</div>
        )}
        {error && <div className="text-destructive">Error: {error}</div>}
        {!loading && !error && <JobCardsList jobsList={jobs as JobItem[]} />}
      </TabsContent>

      <TabsContent value="open" className="mt-4">
        {loading && (
          <div className="text-muted-foreground">Loading jobs...</div>
        )}
        {error && <div className="text-destructive">Error: {error}</div>}
        {!loading && !error && (
          <JobCardsList jobsList={openJobs as JobItem[]} />
        )}
      </TabsContent>

      <TabsContent value="closed" className="mt-4">
        {loading && (
          <div className="text-muted-foreground">Loading jobs...</div>
        )}
        {error && <div className="text-destructive">Error: {error}</div>}
        {!loading && !error && (
          <JobCardsList jobsList={closedJobs as JobItem[]} />
        )}
      </TabsContent>
    </Tabs>
  );
}
