import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDate } from "@/lib/datetime.helpers";
import { toTitleCase } from "@/lib/text.helpers";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { UserProfileResponse } from "@/types/user";

export default function UserInfoTabs(data: any) {
  const userData = data;

  const profile = userData?.data.profile;
  const education = userData?.data.educational_backgrounds ?? [];
  const employment = userData?.data.employment_histories ?? [];
  const credentials = userData?.data.credentials ?? [];
  const govids = userData?.data.government_ids ?? [];
  const socials = userData?.data.user_socials ?? [];

  console.log(userData);
  return (
    <>
      <Tabs defaultValue="profile">
        <TabsList className="bg-transparent p-0 gap-2">
          <TabsTrigger
            value="profile"
            className="shrink-0 rounded-none border border-gray-300 shadow-none hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
          >
            Profile
          </TabsTrigger>

          <TabsTrigger
            value="education"
            className="shrink-0 rounded-none border border-gray-300 shadow-none hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
          >
            Education
          </TabsTrigger>

          <TabsTrigger
            value="employment"
            className="shrink-0 rounded-none border border-gray-300 shadow-none hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
          >
            Employment
          </TabsTrigger>

          <TabsTrigger
            value="credentials"
            className="shrink-0 rounded-none border border-gray-300 shadow-none hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
          >
            Credentials
          </TabsTrigger>

          <TabsTrigger
            value="govids"
            className="shrink-0 rounded-none border border-gray-300 shadow-none hover:bg-gray-300 data-[state=active]:bg-red-500 data-[state=active]:text-white data-[state=active]:border-red-500"
          >
            Government IDs
          </TabsTrigger>
        </TabsList>

        {/* PROFILE */}
        <TabsContent value="profile">
          <div className="border border-gray-300 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="font-medium">
                {[profile?.first_name, profile?.middle_name, profile?.last_name]
                  .filter(Boolean)
                  .join(" ")}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{profile?.email_address ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{profile?.phone_number ?? "N/A"}</p>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <p className="font-medium">
                {profile?.physical_address ?? "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Birth Date</p>
              <p className="font-medium">
                {getDate(profile?.birth_date) ?? "N/A"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Civil Status</p>
              <p className="font-medium">
                {toTitleCase(profile?.civil_status) ?? "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-500">Social</p>
              <div className="flex flex-wrap gap-2">
                {socials.length > 0 ? (
                  socials.map((social, index) => (
                    <a
                      key={index}
                      href={`//${social.url}`}
                      className="border border-gray-300 px-3 py-2 text-xs md:text-sm hover:bg-gray-50"
                    >
                      {social.platform}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-500">No social</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* EDUCATION */}
        <TabsContent value="education">
          <div className="border border-gray-300 p-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {education.length === 0 ? (
              <p className="text-sm text-gray-500">No education records</p>
            ) : (
              education.map((edu, index) => (
                <div
                  key={index}
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
                  <div>
                    <div className="flex flex-col">
                      <p className="text-xs">Year Finished</p>
                      <p className="font-medium">{edu.year_finished}</p>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Honors</p>

                      {edu.honors && edu.honors.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {edu.honors.map((honor, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs border border-gray-300 bg-gray-50"
                            >
                              {honor}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">-</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* EMPLOYMENT */}
        <TabsContent value="employment">
          <div className="border border-gray-300 p-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-2">
            {employment.length === 0 ? (
              <p className="text-sm text-gray-500">No employment history</p>
            ) : (
              employment.map((e) => (
                <div
                  key={e.id}
                  className="border border-gray-300 p-4 flex flex-col md:flex-row gap-4 hover:bg-gray-50 md:justify-between"
                >
                  <div className="space-y-2">
                    <div className="justify-start">
                      <p className="text-xs">Position</p>
                      <p className="font-medium">{e.position}</p>
                    </div>
                    <div className="justify-start">
                      <p className="text-xs">Company</p>
                      <p className="font-medium">{e.company}</p>
                    </div>
                    <div className="justify-start">
                      <p className="text-xs">Industry</p>
                      <p className="font-medium">{e.industry}</p>
                    </div>
                    <div className="justify-start">
                      <p className="text-xs">Specialization</p>
                      <p className="font-medium">{e.specialization}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="justify-start">
                      <p className="text-xs">Period</p>
                      <p className="font-medium">
                        {e.date_started} to {e.date_ended || "Present"}
                      </p>
                    </div>
                    <div className="justify-start">
                      <p className="text-xs">Salary</p>
                      <p className="font-medium">
                        &#8369;{e.monthly_salary || "-"}
                      </p>
                    </div>
                    <div className="justify-start">
                      <p className="text-sm">Courses Handled</p>
                      {e.courses_handled && e.courses_handled.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {e.courses_handled.map((course, index) => (
                            <span
                              key={index}
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
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* CREDENTIALS */}
        <TabsContent value="credentials">
          <div className="border border-gray-300 p-6 space-y-3 grid grid-cols-1 md:grid-cols-3 gap-2">
            {credentials.length === 0 ? (
              <p className="text-sm text-gray-500">No credentials</p>
            ) : (
              credentials.map((cred, index) => (
                <div
                  key={index}
                  className="border border-gray-300 hover:bg-gray-50 p-4 flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center"
                >
                  <div>
                    <p className="text-sm text-gray-500">
                      {cred.number || "-"}
                    </p>
                    <p className="font-medium">
                      {cred.title}{" "}
                      <span className="text-xs">
                        by {cred.issuing_organization}
                      </span>
                    </p>
                  </div>
                  <div>
                    <Link href={"/"}>
                      <button className="w-full sm:w-auto bg-blue-950 text-white px-3 py-2 text-sm flex items-center justify-center gap-2">
                        Open
                        <ExternalLink size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* GOV IDS */}
        <TabsContent value="govids">
          <div className="border border-gray-300 p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {govids.length === 0 ? (
              <p className="text-sm text-gray-500">No government IDs</p>
            ) : (
              govids.map((id, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 space-y-2 hover:bg-gray-50"
                >
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="font-medium">{id.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Reference No.</p>
                    <p className="font-medium">{id.number}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
