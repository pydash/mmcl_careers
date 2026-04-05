import AdminNavbar from "@/components/admin/navbar";
import Link from "next/link";
import { getDate } from "@/lib/datetime.helpers";
import { ArrowLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const jobData = {
  id: "1",
  title: "Software Engineer",
  department: "Information Technology",
  type: "Full-time",
  category: "Non-teaching",
  date_posted: "2024-02-20T00:00:00Z",
  description: `We are looking for a skilled Software Engineer to join our IT team. The ideal candidate will have experience in developing and maintaining software applications, as well as a strong understanding of software development principles and best practices.`,
  salary: "$40,000 - $60,000 per year",
  status: "Open",
  expiration_date: "2024-03-31T00:00:00Z",
  applications: 3,
};

const applicants = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+63 912 345 6789",
    address: "Makati City, Philippines",
    date_applied: "2024-02-25T00:00:00Z",
    status: "Pending",
    notes: "Strong in full-stack development with React and Node.js.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "+63 917 222 3344",
    address: "Quezon City, Philippines",
    date_applied: "2024-02-26T00:00:00Z",
    status: "Shortlisted",
    notes:
      "Excellent communication skills and prior education sector experience.",
  },
  {
    id: 3,
    name: "Mark Reyes",
    email: "mark.reyes@example.com",
    mobile: "+63 918 555 1200",
    address: "Taguig City, Philippines",
    date_applied: "2024-02-27T00:00:00Z",
    status: "Shortlisted",
    notes: "Strong backend expertise and leadership potential.",
  },
];

const shortlistedApplicants = applicants.filter(
  (applicant) => applicant.status === "Shortlisted",
);

export default function AdminJobApplications() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <Link
            href={`/jobs/${jobData.id}`}
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                    {jobData.department}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 w-fit rounded-full px-3 py-1 text-xs font-medium ${jobData.status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    <div
                      className={`size-1.5 rounded-xl ${jobData.status === "Open" ? "bg-green-500" : "bg-gray-500"}`}
                    />
                    {jobData.status}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  {jobData.title}
                </h1>
                <p className="text-sm text-slate-600">
                  {jobData.type} • {jobData.category}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Applications List
              </h2>
              <span className="ml-3 inline-flex h-fit items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                {jobData.applications}
              </span>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {["All", "Pending", "Reviewed", "Shortlisted", "Rejected"].map(
                (filter) => (
                  <button
                    key={filter}
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-red-300 hover:text-red-700"
                  >
                    {filter}
                  </button>
                ),
              )}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-semibold text-slate-900">
                      {applicant.name}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {getDate(applicant.date_applied)}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {applicant.email}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {applicant.mobile}
                    </TableCell>
                    <TableCell
                      className="max-w-[220px] truncate text-slate-600"
                      title={applicant.address}
                    >
                      {applicant.address}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex h-fit items-center rounded-full px-3 py-1 text-xs font-medium ${
                          applicant.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : applicant.status === "Shortlisted"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/jobs/${jobData.id}/applications/${applicant.id}`}
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

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Shortlisted Applicants
              </h2>
              <span className="mb-4 inline-flex h-fit items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                {shortlistedApplicants.length}
              </span>
            </div>

            <div className="space-y-3">
              {shortlistedApplicants.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shortlistedApplicants.map((applicant) => (
                      <TableRow key={`shortlisted-${applicant.id}`}>
                        <TableCell className="font-semibold text-slate-900">
                          {applicant.name}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {getDate(applicant.date_applied)}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {applicant.email}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {applicant.mobile}
                        </TableCell>
                        <TableCell
                          className="max-w-[220px] truncate text-slate-600"
                          title={applicant.address}
                        >
                          {applicant.address}
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex h-fit items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                            {applicant.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/jobs/${jobData.id}/applications/${applicant.id}`}
                            className="inline-flex h-8 items-center rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:bg-slate-100"
                          >
                            View Details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">
                    No shortlisted applicants yet.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
