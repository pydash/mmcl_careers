import ApplicantNavbar from "../navbar";
import { getDaysAgo, getDate } from "@/lib/datetime.helpers";
import Link from "next/link";

const jobData = {
  id: "1",
  title: "Software Engineer",
  department: "Information Technology",
  type: "Full-time",
  category: "Non-teaching",
  postedDate: "2024-02-20T00:00:00Z",
  description: `
We are looking for a skilled Software Engineer to join our IT team. The ideal candidate will have experience in developing and maintaining software applications, as well as a strong understanding of software development principles and best practices.
  `,
  salaryRange: "$40,000 - $60,000 per year",
  applicationDeadline: "2024-03-31T00:00:00Z",
};

export default function ApplicantJobDetailsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <ApplicantNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                  {jobData.department}
                </span>
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
                  {getDate(jobData.postedDate)}
                </p>
                <p className="pt-2 text-sm text-slate-600">
                  Application Deadline
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {getDaysAgo(jobData.applicationDeadline) > 0
                    ? `Closed ${getDaysAgo(jobData.applicationDeadline)} day${
                        getDaysAgo(jobData.applicationDeadline) === 1 ? "" : "s"
                      } ago`
                    : "Open until " +
                      new Date(jobData.applicationDeadline).toLocaleDateString(
                        undefined,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                </p>
                <p className="text-sm text-slate-600">Salary Range</p>
                <p className="text-sm font-semibold text-slate-900">
                  {jobData.salaryRange}
                </p>
              </div>

              <Link
                href={`/jobs/${jobData.id}/apply`}
                className="mt-6 block w-full rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-red-700"
              >
                Apply Now
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
