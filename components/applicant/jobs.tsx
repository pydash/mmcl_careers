import ApplicantNavbar from "./navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const jobs = [
  {
    id: 1,
    role: "Software Engineer",
    department: "Information Technology",
    type: "Full-time",
    teachingType: "Non-teaching",
    posted: "2 days ago",
  },
  {
    id: 2,
    role: "Faculty – Business Management",
    department: "College of Business",
    type: "Full-time",
    teachingType: "Teaching",
    posted: "3 days ago",
  },
  {
    id: 3,
    role: "Guidance Counselor",
    department: "Student Affairs",
    type: "Full-time",
    teachingType: "Non-teaching",
    posted: "5 days ago",
  },
  {
    id: 4,
    role: "Research Assistant",
    department: "College of Science",
    type: "Part-time",
    teachingType: "Non-teaching",
    posted: "1 week ago",
  },
];

export default function ApplicantJobs() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ApplicantNavbar />

      
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-6">

          <section className="mt-12 lg:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Browse Jobs
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Find opportunities that match your skills and career goals.
            </p>
          </section>

      
          <section className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Full-time", "Part-time", "Teaching", "Non-teaching"].map(
              (filter) => (
                <button
                  key={filter}
                  className="text-xs whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-red-400 hover:text-red-700 transition-colors shrink-0"
                >
                  {filter}
                </button>
              ),
            )}
          </section>

        
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Card
                key={job.id}
                className="flex flex-col bg-white hover:shadow-md transition-shadow border-slate-200"
              >
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-red-50 text-red-600 px-2 py-0.5 rounded">
                      {job.teachingType}
                    </span>
                  </div>
                  <CardTitle className="text-base line-clamp-1">
                    {job.role}
                  </CardTitle>
                  <p className="text-xs font-medium text-red-700 truncate">
                    {job.department}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-[11px] text-slate-400">
                    Posted {job.posted}
                  </p>
                </CardContent>
                
                <CardFooter className="gap-2 pt-0">
                  <Button
                    asChild
                    size="sm"
                    className="flex-1 bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    <Link href={`/jobs/${job.id}/apply`}>Apply</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link href={`/jobs/${job.id}`}>Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}