"use client";

import Link from "next/link";
import AdminNavbar from "./navbar";
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

const postedJobs = [
  {
    id: 1,
    title: "Software Engineer",
    department: "Information Technology",
    postedDate: "2024-02-01",
    applications: 24,
    status: "Open",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 2,
    title: "Faculty - Computer Science",
    department: "Academic Affairs",
    postedDate: "2024-01-25",
    applications: 18,
    status: "Open",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 3,
    title: "Guidance Counselor",
    department: "Student Services",
    postedDate: "2024-01-20",
    applications: 12,
    status: "Open",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 4,
    title: "Research Assistant",
    department: "Research & Development",
    postedDate: "2024-01-15",
    applications: 8,
    status: "Closed",
    statusColor: "bg-gray-100 text-gray-800",
  },
  {
    id: 5,
    title: "Marketing Coordinator",
    department: "Marketing & Communications",
    postedDate: "2024-01-10",
    applications: 15,
    status: "Open",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: 6,
    title: "Library Assistant",
    department: "Library Services",
    postedDate: "2024-01-05",
    applications: 6,
    status: "Open",
    statusColor: "bg-green-100 text-green-800",
  },
];

export default function AdminJobs() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />
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
            {postedJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">
                        {job.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600">{job.department}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Status</span>
                      <Badge className={job.statusColor}>{job.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Applications
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        {job.applications}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Posted
                      </span>
                      <span className="text-sm font-medium">
                        {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href={`/jobs/${job.id}`}>View Details</Link>
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
