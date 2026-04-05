"use client";

import Link from "next/link";
import HRNavbar from "@/components/hr/ui/navbar";
import PostJobDialog from "@/components/hr/ui/post-job-dialog";
import JobSearchBar from "@/components/hr/ui/job-search-bar";
import JobFilterSheet from "@/components/hr/ui/job-filter-sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";
import useJobs from "@/hooks/jobs/useJobs";

export default function HRJobs() {
  const { jobs, loading, error } = useJobs();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <HRNavbar />
      <div className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
              <p className="text-gray-600 mt-2">
                Manage and track your open job positions
              </p>
            </div>
            <PostJobDialog />
          </div>

          <div className="mb-6 flex gap-4">
            <JobSearchBar />
            <JobFilterSheet />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {job.position}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{job.department}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{job.employment_type}</Badge>
                      {!job.is_open && (
                        <Badge variant="destructive">Closed</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      Expires{" "}
                      {new Date(job.expiration_date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/jobs/${job.public_id}`}>View Details</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 hover:text-red-700"
                  >
                    Edit
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
