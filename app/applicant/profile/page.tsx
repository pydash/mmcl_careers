"use client";

import { useProfileGetter } from "@/hooks/applicant/profile/useProfileGetter";
import EmptyProfile from "@/components/applicant/profile/empty-profile";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toTitleCase } from "@/lib/text.helpers";
import { getDate } from "@/lib/datetime.helpers";

export default function ProfilePage() {
  const { profile, loading, error } = useProfileGetter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile?.has_profile) {
    return <EmptyProfile />;
  }
  return (
    <main className="min-w-100 mx-auto flex flex-col gap-6">
      <Tabs defaultValue="personal">
        <div className="flex items-center justify-between">
          <TabsList className="bg-transparent">
            <TabsTrigger
              className="rounded-none data-[state=active]:border data-[state=active]:shadow-none data-[state=active]:bg-slate-50"
              value="personal"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border data-[state=active]:shadow-none data-[state=active]:bg-slate-50"
              value="education"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border data-[state=active]:shadow-none data-[state=active]:bg-slate-50"
              value="employment"
            >
              Employment
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border data-[state=active]:shadow-none data-[state=active]:bg-slate-50"
              value="licenses"
            >
              License & Certifications
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border data-[state=active]:shadow-none data-[state=active]:bg-slate-50"
              value="govids"
            >
              Government IDs
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none data-[state=active]:border data-[state=active]:shadow-none data-[state=active]:bg-slate-50"
              value="attachments"
            >
              Attachments
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center justify-end">
            <button className="border-gray-100 border py-1 px-2 hover:bg-gray-50">
              <Link className="text-sm text-gray-600" href="./profile/edit">
                Edit Profile
              </Link>
            </button>
          </div>
        </div>
        <Separator className="my-2" />

        <TabsContent value="personal">
          <section className="flex flex-col gap-6">
            {/* Name */}
            <div className="border p-4 hover:bg-gray-50">
              <p className="text-xs text-muted-foreground mb-1">Name</p>
              <p className="font-semibold text-xl">
                {profile.personal.honorifics} {profile.personal.first_name}{" "}
                {profile.personal.middle_name} {profile.personal.last_name}
              </p>
            </div>

            {/* Personal Info */}
            <div className="border p-4 hover:bg-gray-50">
              <p className="text-xs text-muted-foreground mb-4">
                Personal Information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Sex</p>
                  <p className="font-semibold">
                    {toTitleCase(profile.personal.sex) || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Birth Date</p>
                  <p className="font-semibold">
                    {getDate(profile.personal.birth_date)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Civil Status</p>
                  <p className="font-semibold">
                    {toTitleCase(profile.personal.civil_status) || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Citizenship</p>
                  <p className="font-semibold">
                    {profile.personal.citizenship || "—"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="border p-4 hover:bg-gray-50">
              <p className="text-xs text-muted-foreground mb-4">
                Contact Information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-semibold">
                    {profile.personal.phone_number}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-semibold">
                    {profile.personal.email_address}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-semibold">
                    {profile.personal.physical_address}
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="border p-4 hover:bg-gray-50">
              <p className="text-xs text-muted-foreground mb-2">Summary</p>
              <p className="text-sm text-muted-foreground">
                {profile.personal.about || "No summary provided."}
              </p>
            </div>

            {/* Socials */}
            <div className="border p-4 hover:bg-gray-50">
              <p className="text-xs text-muted-foreground mb-2">Socials</p>
              {profile.socials?.length ? (
                <ul className="space-y-1 text-sm">
                  {profile.socials.map((social: any, index: number) => (
                    <li key={`${social.platform}-${index}`}>
                      <span className="text-muted-foreground">
                        {social.platform}:
                      </span>{" "}
                      {social.url}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No social links.
                </p>
              )}
            </div>
          </section>
        </TabsContent>

        <TabsContent value="education">
          <section className="grid grid-cols-2 gap-4">
            {Array.isArray(profile.education) ? (
              profile.education.map((edu: any, index: number) => (
                <div
                  key={`${edu.institution}-${index}`}
                  className="border p-4 hover:bg-gray-50"
                >
                  <p className="text-sm font-semibold">{edu.institution}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.course} • {edu.degree}
                  </p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Status:</span>{" "}
                      {toTitleCase(edu.status) || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Units Earned:
                      </span>{" "}
                      {edu.units_earned ?? "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Year Finished:
                      </span>{" "}
                      {edu.year_finished ?? "—"}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground">Honors</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.honors
                        ?.map((honor: string) => toTitleCase(honor))
                        .join(", ") || "No honors listed."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border p-4 text-sm text-muted-foreground">
                No education records.
              </div>
            )}
          </section>
        </TabsContent>

        <TabsContent value="employment">
          <section className="grid grid-cols-2 gap-4">
            {profile.employment?.length ? (
              profile.employment.map((job: any, index: number) => (
                <div
                  key={`${job.job_title}-${index}`}
                  className="border p-4 hover:bg-gray-50"
                >
                  <p className="text-sm font-semibold">{job.job_title}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.company_name} • {job.industry}
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Started:</span>{" "}
                      {getDate(job.date_started)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Ended:</span>{" "}
                      {job.date_ended ? getDate(job.date_ended) : "Present"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">
                        Specialization:
                      </span>{" "}
                      {job.position_specialization || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Salary:</span>{" "}
                      {job.monthly_salary ?? "—"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border p-4 text-sm text-muted-foreground">
                No employment history.
              </div>
            )}
          </section>
        </TabsContent>

        <TabsContent value="licenses">
          <section className="grid grid-cols-2 gap-4">
            {profile.license?.length ? (
              profile.license.map((license: any, index: number) => (
                <div
                  key={`${license.title}-${index}`}
                  className="border p-4 hover:bg-gray-50"
                >
                  <p className="text-sm font-semibold">{license.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {license.issuing_organization || "—"}
                  </p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Number:</span>{" "}
                      {license.number || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Issued:</span>{" "}
                      {getDate(license.date_issued)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Expiry:</span>{" "}
                      {getDate(license.expiry_date)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Image URL:</span>{" "}
                      {license.image_url || "—"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="border p-4 text-sm text-muted-foreground">
                No licenses or certifications.
              </div>
            )}
          </section>
        </TabsContent>

        <TabsContent value="govids">
          <section className="grid grid-cols-1 gap-4">
            {profile.gov_ids?.length ? (
              profile.gov_ids.map((govId: any, index: number) => (
                <div
                  key={`${govId.type}-${index}`}
                  className="border p-4 hover:bg-gray-50"
                >
                  <p className="text-sm font-semibold">{govId.type}</p>
                  <p className="text-xs text-muted-foreground">
                    Number: {govId.number || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Issued on {getDate(govId.issued_at)}
                  </p>
                </div>
              ))
            ) : (
              <div className="border p-4 text-sm text-muted-foreground">
                No government IDs.
              </div>
            )}
          </section>
        </TabsContent>

        <TabsContent value="attachments">
          <section className="grid grid-cols-1 gap-4">
            {profile.attachments?.length ? (
              profile.attachments.map((attachment: any, index: number) => (
                <div
                  key={`${attachment.filename}-${index}`}
                  className="border p-4 hover:bg-gray-50"
                >
                  <p className="text-sm font-semibold">{attachment.filename}</p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded on {getDate(attachment.uploaded_at)}
                  </p>
                  <a
                    href={attachment.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm text-red-600 hover:text-red-700"
                  >
                    View Attachment
                  </a>
                </div>
              ))
            ) : (
              <div className="border p-4 text-sm text-muted-foreground">
                No attachments uploaded.
              </div>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </main>
  );
}
