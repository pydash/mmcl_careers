"use client";

import { useProfile } from "@/hooks/applicant/profile/useProfileGetter";
import EmptyProfile from "@/components/applicant/profile/empty-profile";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toTitleCase } from "@/utils/formatText";
import { getShortDate } from "@/utils/formatDate";
import Link from "next/link";

export default function ProfilePage() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile?.profile) {
    return <EmptyProfile />;
  }
  return (
    <main className="min-w-100 mx-auto flex flex-col gap-6">
      <Tabs defaultValue="personal">
        <div className="flex items-center justify-between gap-4 mb-2">
          <TabsList className="bg-gray-50 p-1 rounded-lg border border-gray-200 inline-flex">
            <TabsTrigger
              value="personal"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="employment"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Employment
            </TabsTrigger>
            <TabsTrigger
              value="credentials"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Credentials
            </TabsTrigger>
            <TabsTrigger
              value="government_ids"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Government IDs
            </TabsTrigger>
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Social Media
            </TabsTrigger>
          </TabsList>
          <Button
            variant="outline"
            size="default"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
            asChild
          >
            <Link href="/applicant/profile/edit">Edit Profile</Link>
          </Button>
        </div>
        <Separator className="my-2" />

        <TabsContent value="personal">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1 md:col-span-2 lg:col-span-3">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Full Name
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {profile.profile.first_name}{" "}
                  {profile.profile.middle_name
                    ? `${profile.profile.middle_name} `
                    : ""}
                  {profile.profile.last_name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Gender
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {toTitleCase(profile.profile.gender) || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Birth Place
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {profile.profile.birth_place || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Civil Status
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {toTitleCase(profile.profile.civil_status) || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Citizenship
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {toTitleCase(profile.profile.citizenship) || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Mobile Number
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {profile.profile.mobile_number}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Email Address
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {profile.profile.email_address}
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Permanent Address
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {profile.profile.permanent_address}
                </p>
              </div>
              <div className="space-y-1 md:col-span-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Mailing Address
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {profile.profile.mailing_address}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
              Education Background
            </h2>
            {profile.education_background &&
            profile.education_background.length > 0 ? (
              <div className="space-y-6">
                {profile.education_background.map((edu: any) => (
                  <div
                    key={edu.id}
                    className="pb-6 border-b last:border-b-0 last:pb-0"
                  >
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {edu.school_name}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {edu.degree} • {toTitleCase(edu.level)}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Status
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {toTitleCase(edu.status) || "—"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Units Earned
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {edu.units_earned ?? "—"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Year Graduated
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {edu.year_graduated ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No education records.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="employment">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
              Work Experience
            </h2>
            {profile.work_experience && profile.work_experience.length > 0 ? (
              <div className="space-y-6">
                {profile.work_experience.map((job: any) => (
                  <div
                    key={job.id}
                    className="pb-6 border-b last:border-b-0 last:pb-0"
                  >
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {job.position}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {job.company}{" "}
                      {job.department ? `• ${job.department}` : ""}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Date Started
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {job.date_started
                            ? getShortDate(job.date_started)
                            : "—"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Date Ended
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {job.date_ended
                            ? getShortDate(job.date_ended)
                            : "Present"}
                        </p>
                      </div>
                      {job.courses_handled && (
                        <div className="space-y-1 md:col-span-2">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Courses Handled
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {job.courses_handled.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No employment history.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="credentials">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
              Licenses & Certifications
            </h2>
            {profile.credentials && profile.credentials.length > 0 ? (
              <div className="space-y-6">
                {profile.credentials.map((credential: any) => (
                  <div
                    key={credential.id}
                    className="pb-6 border-b last:border-b-0 last:pb-0"
                  >
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {credential.title}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {credential.authority || "—"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Number
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {credential.number || "—"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Date Taken
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {credential.date_taken
                            ? getShortDate(credential.date_taken)
                            : "—"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Valid Until
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {credential.valid_until
                            ? getShortDate(credential.valid_until)
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No licenses or certifications.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="government_ids">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
              Government IDs
            </h2>
            {profile.government_ids && profile.government_ids.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.government_ids.map((id: any) => (
                  <div key={id.id} className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {id.id_type}
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {id.id_number}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No government IDs.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="social">
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b">
              Social Media Accounts
            </h2>
            {profile.media_accounts && profile.media_accounts.length > 0 ? (
              <div className="space-y-6">
                {profile.media_accounts.map((account: any) => (
                  <div
                    key={account.id}
                    className="pb-6 border-b last:border-b-0 last:pb-0"
                  >
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                      {account.platform}
                    </p>
                    <a
                      href={account.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-blue-600 hover:underline break-all"
                    >
                      {account.link}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No social media accounts.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
