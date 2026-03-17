import AdminNavbar from "@/components/admin/navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  applications: 24,
};

export default function AdminJobDetailsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex gap-2">
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

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  Job Description
                </h2>
                <p className="leading-relaxed text-slate-700">
                  {jobData.description}
                </p>
              </article>
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <div className="mb-6 space-y-2 rounded-lg bg-slate-50 p-4">
                <p className="text-sm text-slate-600">Posted</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(jobData.date_posted).toLocaleDateString()}
                </p>
                <p className="pt-2 text-sm text-slate-600">
                  Application Deadline
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(jobData.expiration_date).toLocaleDateString(
                    undefined,
                    { year: "numeric", month: "long", day: "numeric" },
                  )}
                </p>
                <p className="text-sm text-slate-600">Salary Range</p>
                <p className="text-sm font-semibold text-slate-900">
                  {jobData.salary}
                </p>
                <p className="pt-2 text-sm text-slate-600">Applications</p>
                <p className="text-sm font-semibold text-red-600">
                  {jobData.applications}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Edit Job
                </Button>
                <Link
                  href={`/jobs/${jobData.id}/applications`}
                  className="flex-1"
                >
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    View Applications
                  </Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
