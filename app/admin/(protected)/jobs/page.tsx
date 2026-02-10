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
import Link from "next/link";
import AllJobsCard from "@/components/admin/jobs/all-jobs-card";
import ActiveJobsCard from "@/components/admin/jobs/active-jobs-card";
import ClosedJobsCard from "@/components/admin/jobs/closed-jobs-card";

export default function JobsPage() {
  const [mounted, setMounted] = useState(false);
  const { jobs, loading, error } = useAllJobs();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const activeJobs = jobs.filter((job: any) => job.is_active);
  const inactiveJobs = jobs.filter((job: any) => !job.is_active);

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
              <TableCell>{job.title.trim()}</TableCell>
              <TableCell>{getDate(job.date_posted)}</TableCell>
              <TableCell>{job.total_applicants}</TableCell>
              <TableCell>{job.is_active ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <JobViewButton jobId={job.id} />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <>
      <Tabs defaultValue="all">
        <div className="flex border-b-2 border-b-muted pb-4">
          <div>
            <TabsList className="bg-0">
              <TabsTrigger
                value="all"
                className="shadow-none! data-[state=active]:border rounded-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="shadow-none! data-[state=active]:border rounded-none"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="closed"
                className="shadow-none! data-[state=active]:border rounded-none"
              >
                Closed
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="ml-auto">
            <Button variant="default">
              <Link href="/admin/jobs/post-a-job">Post a job</Link>
            </Button>
          </div>
        </div>
        <TabsContent value="all">
          <AllJobsCard />
        </TabsContent>
        <TabsContent value="active">
          <ActiveJobsCard />
        </TabsContent>
        <TabsContent value="closed">
          <ClosedJobsCard />
        </TabsContent>
      </Tabs>
    </>
  );
}
