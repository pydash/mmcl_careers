"use client";

import { useProfileGetter } from "@/hooks/applicant/profile/useProfileGetter";
import EmptyProfile from "@/components/applicant/profile/empty-profile";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toTitleCase } from "@/utils/formatText";

export default function ProfilePage() {
  const { profile, loading, error } = useProfileGetter();

  const formatDate = (value?: string | null) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
  };

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
        <TabsList className="bg-transparent">
          <TabsTrigger
            className="rounded-none shadow-none data-[state=active]:border"
            value="personal"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none shadow-none data-[state=active]:border"
            value="education"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none shadow-none data-[state=active]:border"
            value="employment"
          >
            Employment
          </TabsTrigger>
          <TabsTrigger
            className="rounded-none shadow-none data-[state=active]:border"
            value="licenses"
          >
            Licenses
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />

        <TabsContent value="personal">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 border p-4 md:col-span-2">
              <p className="text-xs text-muted-foreground uppercase">Name</p>
              <p className="font-semibold text-xl">
                {profile.personal.honorifics} {profile.personal.first_name}{" "}
                {profile.personal.middle_name} {profile.personal.last_name}{" "}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">Sex</p>
              <p className="font-semibold">
                {toTitleCase(profile.personal.sex) || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Birth Date
              </p>
              <p className="font-semibold">
                {formatDate(profile.personal.birth_date)}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Civil Status
              </p>
              <p className="font-semibold">
                {toTitleCase(profile.personal.civil_status) || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Citizenship
              </p>
              <p className="font-semibold">
                {profile.personal.citizenship || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">Phone</p>
              <p className="font-semibold">{profile.personal.phone_number}</p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Location
              </p>
              <p className="font-semibold">
                {profile.personal.physical_address}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">Email</p>
              <p className="font-semibold">{profile.personal.email_address}</p>
            </div>
          </section>

          <section className="mt-4 flex flex-col gap-2 border p-4">
            <p className="text-xs text-muted-foreground uppercase">Summary</p>
            <p className="text-sm text-muted-foreground">
              {profile.personal.about || "No summary provided."}
            </p>
          </section>

          <section className="mt-4 flex flex-col gap-2 border p-4">
            <p className="text-xs text-muted-foreground uppercase">Socials</p>
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
              <p className="text-sm text-muted-foreground">No social links.</p>
            )}
          </section>
        </TabsContent>

        <TabsContent value="education">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">ID</p>
              <p className="font-semibold">{profile.education?.id || "—"}</p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Institution
              </p>
              <p className="font-semibold">
                {profile.education?.institution || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">Course</p>
              <p className="font-semibold">
                {profile.education?.course || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">Degree</p>
              <p className="font-semibold">
                {profile.education?.degree || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">Status</p>
              <p className="font-semibold">
                {profile.education?.status || "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Units Earned
              </p>
              <p className="font-semibold">
                {profile.education?.units_earned ?? "—"}
              </p>
            </div>
            <div className="flex flex-col gap-2 border p-4">
              <p className="text-xs text-muted-foreground uppercase">
                Year Finished
              </p>
              <p className="font-semibold">
                {profile.education?.year_finished ?? "—"}
              </p>
            </div>
          </section>

          <section className="mt-4 flex flex-col gap-2 border p-4">
            <p className="text-xs text-muted-foreground uppercase">Honors</p>
            <p className="text-sm text-muted-foreground">
              {profile.education?.honors?.length
                ? profile.education.honors.join(", ")
                : "No honors listed."}
            </p>
          </section>
        </TabsContent>

        <TabsContent value="employment">
          <section className="flex flex-col gap-4">
            {profile.employment?.length ? (
              profile.employment.map((job: any, index: number) => (
                <div key={`${job.job_title}-${index}`} className="border p-4">
                  <p className="text-sm font-semibold">{job.job_title}</p>
                  <p className="text-xs text-muted-foreground">
                    {job.company_name} • {job.industry}
                  </p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">ID:</span>{" "}
                      {job.id ?? "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Account ID:</span>{" "}
                      {job.acc_id || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Started:</span>{" "}
                      {formatDate(job.date_started)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Ended:</span>{" "}
                      {job.date_ended ? formatDate(job.date_ended) : "Present"}
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
          <section className="flex flex-col gap-4">
            {profile.license?.length ? (
              profile.license.map((license: any, index: number) => (
                <div key={`${license.title}-${index}`} className="border p-4">
                  <p className="text-sm font-semibold">{license.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {license.issuing_organization || "—"}
                  </p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">ID:</span>{" "}
                      {license.id ?? "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Account ID:</span>{" "}
                      {license.acc_id || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Number:</span>{" "}
                      {license.number || "—"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Issued:</span>{" "}
                      {formatDate(license.date_issued)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Expiry:</span>{" "}
                      {formatDate(license.expiry_date)}
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
      </Tabs>
    </main>
  );
}
