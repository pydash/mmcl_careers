"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/formatCurrency";
import { Job } from "@/models/Job";
import { Badge } from "@/components/ui/badge";

import { useJobDetails } from "@/hooks/applicant/jobs/useJobDetails";
import { getDate } from "@/utils/formatDate";

export default function JobDetails({ job_pub_id }: { job_pub_id: string }) {
  const { job, loading, error } = useJobDetails(job_pub_id);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-sm font-medium text-slate-500 animate-pulse">
          Loading job details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 font-medium">
        Error: {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-12 text-center text-slate-500 font-medium">
        Job not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Title Section */}
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
          {job.title}
        </h1>
        <div className="flex gap-2 flex-wrap">
          {job.tags?.map((tag, index) => (
            <Badge
              key={index}
              variant="default"
              className="bg-red-50 text-red-700 hover:bg-red-100 border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Key Details Grid: Responsive Columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 border border-slate-200">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Department
          </p>
          <p className="text-sm font-bold text-slate-900">{job.department}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Employment Type
          </p>
          <p className="text-sm font-bold text-slate-900">
            {job.employment_type}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Deadline
          </p>
          <p className="text-sm font-bold text-red-600">
            {getDate(job.expiry_date)}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Posted On
          </p>
          <p className="text-sm font-bold text-slate-900">
            {getDate(job.posted_at)}
          </p>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {/* Main Content Areas */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-md font-medium text-slate-900">Description</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-md font-medium text-slate-900">
            Responsibilities
          </h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
            {job.responsibilities}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-md font-medium text-slate-900">Requirements</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-wrap">
            {job.requirements}
          </p>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {/* Action Buttons: Full width on mobile, auto on desktop */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-none"
          asChild
        >
          <Link href={`/applicant/jobs/${job.public_id}/apply`}>Apply Now</Link>
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto text-black hover:bg-slate-100 rounded-none"
          asChild
        >
          <Link href={`/applicant/jobs`}>Back</Link>
        </Button>
      </div>
    </div>
  );
}
