"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useJobDetails } from "@/hooks/applicant/jobs/useJobDetails";
import { getDateString } from "@/utils/formatDate";

export default function JobDetails({ pub_id }: { pub_id: string }) {
  const { job, loading, error } = useJobDetails(pub_id);

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
      {/* Header Section */}
      <div className="border rounded-lg p-6 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {job.position}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Department
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {job.department}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Employment Type
            </p>
            <p className="text-sm font-semibold text-gray-900 capitalize">
              {job.employment_type}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Application Deadline
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {getDateString(new Date(job.expiration_date))}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Posted On
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {getDateString(new Date(job.created_at))}
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
          Job Description
        </h2>
        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="default"
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6"
          asChild
        >
          <Link href={`/applicant/jobs/${job.public_id}/apply`}>Apply Now</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg px-6"
          asChild
        >
          <Link href="/applicant/jobs">Back to Jobs</Link>
        </Button>
      </div>
    </div>
  );
}
