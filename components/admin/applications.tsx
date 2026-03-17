import Link from "next/link";
import AdminNavbar from "./navbar";
import { getDate } from "@/lib/datetime.helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Clock3, UserRoundCheck, XCircle } from "lucide-react";

const applications = [
  {
    id: 1,
    applicant: "John Doe",
    jobId: 1,
    jobTitle: "Software Engineer",
    department: "Information Technology",
    appliedOn: "2024-02-25T00:00:00Z",
    status: "Pending",
  },
  {
    id: 2,
    applicant: "Jane Smith",
    jobId: 1,
    jobTitle: "Software Engineer",
    department: "Information Technology",
    appliedOn: "2024-02-26T00:00:00Z",
    status: "Shortlisted",
  },
  {
    id: 3,
    applicant: "Mark Reyes",
    jobId: 1,
    jobTitle: "Software Engineer",
    department: "Information Technology",
    appliedOn: "2024-02-27T00:00:00Z",
    status: "Interview",
  },
  {
    id: 4,
    applicant: "Alyssa Cruz",
    jobId: 2,
    jobTitle: "Guidance Counselor",
    department: "Student Services",
    appliedOn: "2024-02-20T00:00:00Z",
    status: "Rejected",
  },
  {
    id: 5,
    applicant: "Robert Tan",
    jobId: 3,
    jobTitle: "Library Assistant",
    department: "Library Services",
    appliedOn: "2024-02-19T00:00:00Z",
    status: "Offer",
  },
];

const totalApplications = applications.length;
const pendingApplications = applications.filter(
  (app) => app.status === "Pending",
).length;
const shortlistedApplications = applications.filter(
  (app) => app.status === "Shortlisted" || app.status === "Interview",
).length;
const rejectedApplications = applications.filter(
  (app) => app.status === "Rejected",
).length;

const getStatusBadgeClass = (status: string) => {
  if (status === "Pending") return "bg-yellow-100 text-yellow-800";
  if (status === "Shortlisted" || status === "Interview") {
    return "bg-blue-100 text-blue-800";
  }
  if (status === "Offer" || status === "Hired") {
    return "bg-emerald-100 text-emerald-800";
  }

  return "bg-rose-100 text-rose-800";
};

export default function AdminApplications() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Applications
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review all submitted applications across active job postings.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4 text-red-600" />
                    Total Applications
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {totalApplications}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4 text-amber-600" />
                    Pending
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {pendingApplications}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <UserRoundCheck className="h-4 w-4 text-blue-600" />
                    Shortlisted/Interview
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {shortlistedApplications}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    Rejected
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {rejectedApplications}
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {[
                "All",
                "Pending",
                "Shortlisted",
                "Interview",
                "Offer",
                "Hired",
                "Rejected",
              ].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-red-300 hover:text-red-700"
                >
                  {filter}
                </button>
              ))}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-semibold text-slate-900">
                      {application.applicant}
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {application.jobTitle}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {application.department}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {getDate(application.appliedOn)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getStatusBadgeClass(application.status)}
                      >
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/jobs/${application.jobId}/applications/${application.id}`}
                        className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        View Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </main>
    </div>
  );
}
