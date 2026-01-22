"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import { Job } from "@/models/Job";
import { Badge } from "@/components/ui/badge";

import { useJobDetails } from "@/hooks/applicant/jobs/useJobDetails";

export default function JobDetails({ job_pub_id }: { job_pub_id: string }) {
  const { job, loading, error } = useJobDetails(job_pub_id);

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
    <div className="flex flex-col gap-6">
      {/* Title Section */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <div className="flex gap-2 flex-wrap">
          {job.tags?.map((tag, index) => (
            <Badge key={index} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-4 gap-4">
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">Department</p>
          <p className="font-semibold">{job.department}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">
            Employment Type
          </p>
          <p className="font-semibold">{job.employment_type}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">
            Application Deadline
          </p>
          <p className="font-semibold">
            {new Date(job.expiry_date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">Posted On</p>
          <p className="font-semibold">
            {new Date(job.posted_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
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

      <Separator />

      {/* Apply Button */}
      <div className="flex gap-2">
        <Button
          variant="default"
          className="rounded-none bg-blue-950 hover:bg-blue-900"
          asChild
        >
          <Link href={`/applicant/jobs/${job.public_id}/apply`}>Apply Now</Link>
        </Button>
        <Button
          variant="outline"
          className="rounded-none bg-white text-red-600 border-red-600 hover:bg-red-100 hover:text-red-600"
          asChild
        >
          <Link href={`/applicant/jobs`}>Back</Link>
        </Button>
      </div>
    </div>
  );
}
