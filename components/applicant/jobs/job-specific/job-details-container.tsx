"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useJobDetails } from "@/hooks/applicant/jobs/useJobDetails";
import { formatCurrency } from "@/utils/formatCurrency";
import { JobPostItemDetail } from "@/models/job-posts/job-post.detail";
import { Badge } from "@/components/ui/badge";

function SideDetails({ job }: { job: JobPostItemDetail }) {
  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-lg gap-4">
      <div className="flex gap-2">
        {job.tags?.map((tag, index) => (
          <Badge key={index} variant="default">
            {tag}
          </Badge>
        ))}
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold">
          {formatCurrency(job.salary_min)} - {formatCurrency(job.salary_max)}
        </h3>
        <p className="text-muted-foreground text-sm">Salary Range</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold">{job.department}</h3>
        <p className="text-muted-foreground text-sm">Department</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold">
          {new Date(job.expiry_date).toLocaleDateString()}
        </h3>
        <p className="text-muted-foreground text-sm">Application Deadline</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold">
          {new Date(job.posted_at).toLocaleDateString()}
        </h3>
        <p className="text-muted-foreground text-sm">Posted On</p>
      </div>
      <Separator />
      <Button variant="default" className="w-full" asChild>
        <Link href={`/applicant/jobs/${job.id}/apply`}>Apply Now</Link>
      </Button>
    </div>
  );
}

export default function JobDetailsContainer({ jobId }: { jobId: string }) {
  const { job, loading, error } = useJobDetails(jobId);

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">{job.title}</h1>
      </div>
      <div className="grid grid-cols-[7fr_3fr] gap-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Description</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {job.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Responsibilities</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {job.responsibilities}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {job.requirements}
            </p>
          </div>
        </div>
        <div>
          <SideDetails job={job} />
        </div>
      </div>
    </div>
  );
}
