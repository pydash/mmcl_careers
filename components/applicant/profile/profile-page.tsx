"use client";

import { useProfile } from "@/hooks/applicant/useProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { getDate } from "@/lib/datetime.helpers";
import { toTitleCase } from "@/lib/text.helpers";

export default function ApplicantProfilePage() {
  const { profile, loading, error } = useProfile();

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;
  if (!profile) return <h3>No profile found</h3>;

  const {
    profile: p,
    education,
    employment,
    credentials,
    govids,
    social,
  } = profile;

  const tabClass =
    "shrink-0 rounded-none border border-gray-300 shadow-none hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500";

  return (
    <>
      <h3 className="font-semibold text-xl mb-4">Your Profile</h3>
      <Tabs defaultValue="profile">
        <div className="flex justify-between">
          <TabsList className="bg-transparent p-0 gap-2">
            <TabsTrigger value="profile" className={tabClass}>
              Profile
            </TabsTrigger>
            <TabsTrigger value="education" className={tabClass}>
              Education
            </TabsTrigger>
            <TabsTrigger value="employment" className={tabClass}>
              Employment
            </TabsTrigger>
            <TabsTrigger value="credentials" className={tabClass}>
              Credentials
            </TabsTrigger>
            <TabsTrigger value="govids" className={tabClass}>
              Government IDs
            </TabsTrigger>
          </TabsList>
          <a href="/profile/edit" className="bg-blue-600 text-white px-4 py-1 ">
            Edit
          </a>
        </div>

        {/* PROFILE */}
        <TabsContent value="profile">
          <div className="border border-gray-300 p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="font-medium">
                {[p.honorific, p.first_name, p.middle_name, p.last_name]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{p.email_address ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{p.phone_number ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-medium">{p.physical_address ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500">Birth Date</p>
              <p className="font-medium">{getDate(p.birth_date)}</p>
            </div>
            <div>
              <p className="text-gray-500">Civil Status</p>
              <p className="font-medium">{toTitleCase(p.civil_status)}</p>
            </div>
            <div className="col-span-2 space-y-2">
              <p className="text-gray-500">About</p>
              <p>{p.about ?? "-"}</p>
            </div>
            <div className="space-y-2 col-span-2">
              <p className="text-gray-500">Social</p>
              <div className="flex flex-wrap gap-2">
                {social?.length > 0 ? (
                  social.map((s, index) => (
                    <a
                      key={index}
                      href={`https://${s.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-gray-300 px-3 py-2 text-xs md:text-sm hover:bg-gray-50"
                    >
                      {s.platform}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">No social links</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* EDUCATION */}
        <TabsContent value="education">
          <div className="border border-gray-300 p-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {education?.length > 0 ? (
              education.map((edu) => (
                <div
                  key={edu.id}
                  className="border border-gray-300 p-4 hover:bg-gray-50 flex flex-col md:flex-row gap-4 md:justify-between"
                >
                  <div className="flex flex-col space-y-2">
                    <div>
                      <p className="text-xs">Degree</p>
                      <p className="font-medium">{edu.degree}</p>
                    </div>
                    <div>
                      <p className="text-xs">Course</p>
                      <p className="font-medium">{edu.course}</p>
                    </div>
                    <div>
                      <p className="text-xs">Institution</p>
                      <p className="font-medium">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-xs">Year Finished</p>
                    <p className="font-medium">{edu.year_finished}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No education records</p>
            )}
          </div>
        </TabsContent>

        {/* EMPLOYMENT */}
        <TabsContent value="employment">
          <div className="border border-gray-300 p-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {employment?.length > 0 ? (
              employment.map((emp) => (
                <div
                  key={emp.id}
                  className="border border-gray-300 p-4 flex flex-col md:flex-row gap-4 hover:bg-gray-50 md:justify-between"
                >
                  <div className="space-y-2">
                    <p className="text-xs">Position</p>
                    <p className="font-medium">{emp.position}</p>
                    <p className="text-xs">Company</p>
                    <p className="font-medium">{emp.company}</p>
                    <p className="text-xs">Industry</p>
                    <p className="font-medium">{emp.industry}</p>
                    <p className="text-xs">Specialization</p>
                    <p className="font-medium">{emp.specialization}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs">Period</p>
                    <p className="font-medium">
                      {emp.date_started} to {emp.date_ended ?? "Present"}
                    </p>
                    <p className="text-xs">Salary</p>
                    <p className="font-medium">&#8369;{emp.monthly_salary}</p>
                    <p className="text-xs">Courses Handled</p>
                    {emp.courses_handled?.length > 0 ? (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {emp.courses_handled.map((course, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs border border-gray-300 bg-gray-50"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-400">-</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No employment records</p>
            )}
          </div>
        </TabsContent>

        {/* CREDENTIALS */}
        <TabsContent value="credentials">
          <div className="border border-gray-300 p-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {credentials?.length > 0 ? (
              credentials.map((cred) => (
                <div
                  key={cred.id}
                  className="border border-gray-300 hover:bg-gray-50 p-4 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="text-sm text-gray-500">{cred.number}</p>
                    <p className="font-medium">
                      {cred.title}{" "}
                      <span className="text-xs">
                        by {cred.issuing_organization}
                      </span>
                    </p>
                  </div>
                  <div>
                    <Link href="/">
                      <button className="w-full sm:w-auto bg-blue-950 text-white px-3 py-2 text-sm flex items-center justify-center gap-2">
                        Open
                        <ExternalLink size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No credentials</p>
            )}
          </div>
        </TabsContent>

        {/* GOV IDS */}
        <TabsContent value="govids">
          <div className="border border-gray-300 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {govids?.length > 0 ? (
              govids.map((id) => (
                <div
                  key={id.type}
                  className="border border-gray-300 p-4 space-y-2 hover:bg-gray-50"
                >
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium">{id.type}</p>
                  <p className="text-xs text-gray-500">Reference No.</p>
                  <p className="font-medium">{id.number}</p>
                  <p className="text-xs text-gray-500">Validity</p>
                  <p className="font-medium">
                    {getDate(id.issued_date)} - {getDate(id.expiry_date)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No government IDs</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
