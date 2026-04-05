import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const jobs = [
  {
    id: 1,
    role: "Software Engineer",
    department: "Information Technology",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Feb 28, 2026",
  },
  {
    id: 2,
    role: "Administrative Assistant",
    department: "Office of the Registrar",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Mar 1, 2026",
  },
  {
    id: 3,
    role: "Research Assistant",
    department: "College of Science",
    type: "Part-time",
    teaching_type: "Non-teaching",
    posted: "Mar 2, 2026",
  },
  {
    id: 4,
    role: "Faculty – Business Management",
    department: "College of Business",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Mar 3, 2026",
  },
  {
    id: 5,
    role: "Guidance Counselor",
    department: "Student Affairs",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Mar 4, 2026",
  },
  {
    id: 6,
    role: "Library Assistant",
    department: "University Library",
    type: "Part-time",
    teaching_type: "Non-teaching",
    posted: "Mar 5, 2026",
  },
  {
    id: 7,
    role: "Faculty – Computer Science",
    department: "College of Engineering",
    type: "Full-time",
    teaching_type: "Teaching",
    posted: "Mar 5, 2026",
  },
  {
    id: 8,
    role: "Nurse",
    department: "University Clinic",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Mar 5, 2026",
  },
  {
    id: 9,
    role: "Security Officer",
    department: "Campus Security",
    type: "Full-time",
    teaching_type: "Non-teaching",
    posted: "Mar 5, 2026",
  },
];

export default function PublicJobs() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Open Positions
          </h1>
          <p className="text-gray-500 text-sm">
            {jobs.length} job openings across all university departments.
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", "Full-time", "Part-time", "Teaching", "Non-teaching"].map(
            (filter) => (
              <button
                key={filter}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-blue-950 hover:text-blue-950 transition-colors cursor-pointer"
              >
                {filter}
              </button>
            ),
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="flex flex-col hover:shadow-md transition-shadow bg-white"
            >
              <CardHeader className="pb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {job.type}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {job.teaching_type}
                  </span>
                </div>
                <CardTitle className="text-base font-semibold text-gray-900">
                  {job.role}
                </CardTitle>
                <p className="text-blue-900 text-sm">{job.department}</p>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="text-xs text-gray-400 mt-auto">
                  Posted {job.posted}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="link"
                  className="text-blue-900 p-0 h-auto"
                >
                  <a href={`/jobs/${job.id}`}>View Details →</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
