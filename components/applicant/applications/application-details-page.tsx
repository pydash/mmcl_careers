import ApplicantNavbar from "../navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDate } from "@/lib/datetime.helpers";

const applicationData = {
  application: {
    id: "1",
    title: "Software Engineer",
    department: "Information Technology",
    type: "Full-time",
    category: "Non-teaching",
    date_applied: "2024-02-25T00:00:00Z",
    status: "Pending",
  },
  interview: {
    date: "2024-03-05T14:00:00Z",
    location: "MMCL Main Campus - Conference Room A",
    interviewer: "Jane Smith, IT Department Head",
    notes:
      "Please prepare to discuss your previous projects and experience in software development. The interview will last approximately 45 minutes and will include a technical assessment.",
  },
  offer: {
    date: "2024-03-15T00:00:00Z",
    salary: "$50,000 per year",
    status: "Pending",
  },
};

export default function ApplicantApplicationDetails() {
  const statusStyles: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    Interview: "bg-blue-100 text-blue-800",
    Offer: "bg-emerald-100 text-emerald-800",
    Submitted: "bg-gray-100 text-gray-800",
    Rejected: "bg-red-100 text-red-800",
  };

  const statusClass =
    statusStyles[applicationData.application.status] ||
    "bg-slate-100 text-slate-800";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ApplicantNavbar />

      <main className="flex-1 ml-64 p-8 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-xl font-bold text-slate-900">
              Application Details
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review the details of your application and track its status.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-lg font-semibold text-slate-900">
                Job Information
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">Title</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {applicationData.application.title}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">
                    Department
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {applicationData.application.department}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">Type</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {applicationData.application.type}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-500">Category</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {applicationData.application.category}
                  </p>
                </div>
              </div>

              {applicationData.application.status === "Interview" &&
                applicationData.interview && (
                  <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
                    <h3 className="mb-4 text-sm font-semibold text-blue-900">
                      Interview Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-blue-700">
                          Date
                        </p>
                        <p className="text-sm font-semibold text-blue-900">
                          {getDate(applicationData.interview.date)}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-blue-700">
                          Time
                        </p>
                        <p className="text-sm font-semibold text-blue-900">
                          {new Date(
                            applicationData.interview.date,
                          ).toLocaleTimeString(undefined, {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <p className="text-xs font-medium text-blue-700">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-blue-900">
                          {applicationData.interview.location}
                        </p>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <p className="text-xs font-medium text-blue-700">
                          Interviewer
                        </p>
                        <p className="text-sm font-semibold text-blue-900">
                          {applicationData.interview.interviewer}
                        </p>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <p className="text-xs font-medium text-blue-700">
                          Notes
                        </p>
                        <p className="text-sm text-blue-900 whitespace-pre-wrap">
                          {applicationData.interview.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {applicationData.application.status === "Offer" &&
                applicationData.offer && (
                  <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                    <h3 className="mb-4 text-sm font-semibold text-emerald-900">
                      Offer Details
                    </h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-emerald-700">
                          Offer Date
                        </p>
                        <p className="text-sm font-semibold text-emerald-900">
                          {getDate(applicationData.offer.date)}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs font-medium text-emerald-700">
                          Salary
                        </p>
                        <p className="text-sm font-semibold text-emerald-900">
                          {applicationData.offer.salary}
                        </p>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <p className="text-xs font-medium text-emerald-700">
                          Offer Status
                        </p>
                        <p className="text-sm font-semibold text-emerald-900">
                          {applicationData.offer.status}
                        </p>
                      </div>

                      {applicationData.offer.status === "Pending" && (
                        <div className="flex gap-2 md:col-span-2">
                          <Button className="bg-emerald-600 text-white hover:bg-emerald-700">
                            Accept Offer
                          </Button>
                          <Button
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            Decline Offer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </article>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-slate-900">
                Application Summary
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Application ID
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    #{applicationData.application.id}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Date Applied
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {getDate(applicationData.application.date_applied)}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium text-slate-500">
                    Status
                  </p>
                  <Badge className={statusClass}>
                    {applicationData.application.status}
                  </Badge>
                </div>

                {applicationData.application.status === "Pending" && (
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    Withdraw Application
                  </Button>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}
