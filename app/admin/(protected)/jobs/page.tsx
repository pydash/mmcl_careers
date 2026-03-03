"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAllJobs } from "@/hooks/hr/jobs/useAllJobs";
import { getDate } from "@/utils/formatDate";
import { useState, useEffect } from "react";
import { JobViewButton } from "@/components/hr/jobs/job-view-button";
import { JobEditButton } from "@/components/hr/jobs/job-edit-button";
import Link from "next/link";

export default function JobsPage() {
  const [mounted, setMounted] = useState(false);
  const { jobs, loading, error } = useAllJobs();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeJobs = jobs.filter((job: any) => job.is_open);
  const inactiveJobs = jobs.filter((job: any) => !job.is_open);

  const JobsTable = ({ jobsList }: { jobsList: any[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Date Posted</TableHead>
          <TableHead>Total Applicants</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobsList.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              No jobs found
            </TableCell>
          </TableRow>
        ) : (
          jobsList.map((job: any) => (
            <TableRow key={job.id}>
              <TableCell>{job.id}</TableCell>
              <TableCell>{job.position.trim()}</TableCell>
              <TableCell>{getDate(job.date_posted)}</TableCell>
              <TableCell>{job.total_applicants}</TableCell>
              <TableCell>{job.is_open ? "Open" : "Closed"}</TableCell>
              <TableCell>
                <JobViewButton jobId={job.id} />
              </TableCell>
              <TableCell>
                <JobEditButton jobId={job.id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Manage job postings and view applicants
          </p>
        </div>
        <Button variant="default" asChild>
          <Link href="/admin/jobs/post-a-job">Post a job</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading && (
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          )}
          {error && (
            <div className="rounded-lg border bg-destructive/10 p-8 text-center">
              <p className="text-destructive">Error: {error}</p>
            </div>
          )}
          {!loading && !error && (
            <div className="rounded-lg border bg-card shadow-sm">
              <JobsTable jobsList={jobs} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {loading && (
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          )}
          {error && (
            <div className="rounded-lg border bg-destructive/10 p-8 text-center">
              <p className="text-destructive">Error: {error}</p>
            </div>
          )}
          {!loading && !error && (
            <div className="rounded-lg border bg-card shadow-sm">
              <JobsTable jobsList={activeJobs} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {loading && (
            <div className="rounded-lg border bg-card p-8 text-center">
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          )}
          {error && (
            <div className="rounded-lg border bg-destructive/10 p-8 text-center">
              <p className="text-destructive">Error: {error}</p>
            </div>
          )}
          {!loading && !error && (
            <div className="rounded-lg border bg-card shadow-sm">
              <JobsTable jobsList={inactiveJobs} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
