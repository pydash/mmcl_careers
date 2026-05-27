"use client";

// Framework
import Link from "next/link";

// Hooks
import { useDashboard } from "@/hooks/applicant/useDashboard";

// Helpers
import { getDate, getTime, getDateTime } from "@/lib/datetime.helpers";

export default function ApplicantDashboardPage() {
  const { data, loading, error } = useDashboard();
  const app_stage_history = data?.app_stage_history;
  const recent_applications = data?.recent_applications;
  const job_recommendations = data?.job_recommendations;
  const upcoming_interviews = data?.upcoming_interviews;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
        {/* Left Side */}
        <div className="md:col-span-2 space-y-4">
          {/* Stage History Component */}
          <div className="border border-gray-300 bg-white">
            {/* Header */}
            <div className="border-b border-gray-300 px-5 py-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Applying for
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    {app_stage_history?.[0].title}
                  </h3>
                </div>

                <Link
                  href={`/applications/${app_stage_history?.[0].application_id}`}
                >
                  <button className="bg-blue-950 text-white text-sm py-2 px-4">
                    Open Application
                  </button>
                </Link>
              </div>
            </div>
            {/* Stage History */}
            <div className="px-5 py-4">
              <h4 className="mb-4 text-sm font-semibold text-gray-700">
                Stage History
              </h4>

              <ul className="space-y-4">
                {app_stage_history?.map((stage, index) => (
                  <li
                    key={index}
                    className="border-l border-gray-300 pl-4 hover:bg-gray-100 p-2"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {stage.stage}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      <span className="bg-blue-50 text-blue-600 py-1 px-2">
                        {stage.status}
                      </span>{" "}
                      | {getDateTime(stage.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Applications Component */}
          <div className="border border-gray-300 p-4">
            <h4 className="mb-4 text-lg font-semibold text-gray-800">
              Recent Applications
            </h4>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">
                      Title
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-normal text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recent_applications?.map((app, index) => (
                    <tr key={app.id || index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm">{app.id}</td>
                      <td className="px-4 py-2 text-sm">{app.title}</td>
                      <td className="px-4 py-2 text-sm">
                        <div className="p-2 bg-yellow-50 inline-block text-yellow-600 rounded">
                          {app.status}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-xs">
                        <Link href={`/applications/${app.id}`}>
                          <button className="bg-blue-950 text-white px-3 py-1">
                            View Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="border border-gray-300 p-4">
            <h3 className="mb-3 text-lg font-semibold text-gray-800">
              Other Jobs
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job_recommendations?.map((job, index) => (
                <div
                  key={job.public_id || index}
                  className="border border-gray-300 p-2 bg-gray-50 flex flex-col justify-between"
                >
                  {/* Department Pill */}
                  <div className="bg-red-600 text-white text-xs px-2 py-1 inline-block mb-2 self-start">
                    {job.department || "-"}
                  </div>

                  {/* Job Info */}
                  <div className="mb-2">
                    <p className="text-sm font-medium text-gray-900">
                      {job.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      Open Until: {getDate(job.expiry_date)}
                    </p>
                  </div>

                  {/* Divider */}
                  <hr className="border-t border-gray-300 my-2" />

                  {/* View Details Button */}
                  <Link
                    href={`/jobs/${job.public_id}`}
                    className="mt-2 self-end"
                  >
                    <button className="bg-blue-950 text-white text-xs py-2 px-3 hover:bg-blue-900">
                      See Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="border border-gray-300 bg-white">
          {/* Header */}
          <div className="border-b border-gray-300 px-5 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Upcoming Interviews
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Your scheduled interview sessions
                </p>
              </div>
            </div>
          </div>

          {/* Interview List */}
          <div className="divide-y divide-gray-300">
            {upcoming_interviews?.map((interview, index) => (
              <div
                key={interview.id || index}
                className="p-5 space-y-4 hover:bg-gray-50"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {interview?.title || "Interview"}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {interview?.job_title || ""}
                    </p>
                  </div>

                  <div className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                    {interview?.status || ""}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Date</span>
                    <span className="font-medium">
                      {getDate(interview?.scheduled_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Time</span>
                    <span className="font-medium">
                      {getTime(interview?.scheduled_date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Mode</span>
                    <span className="font-medium">{interview?.mode || ""}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Interview Card 1 */}
          </div>
        </div>
      </div>
    </>
  );
}
