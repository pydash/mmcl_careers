import ApplicantNavbar from "@/components/applicant/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { User } from "lucide-react";
import { getDateFromShortDate } from "@/lib/datetime.helpers";

const user = {
  personal: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    mobile: "+63 900 123 4567",
    landline: "(02) 8123 4567",
    gender: "Male",
    address: "Makati City, Philippines",
    birthplace: "Quezon City",
    civil_status: "Single",
    religion: "Roman Catholic",
    citizenship: "Filipino",
  },
  education: [
    {
      institution: "University of the Philippines",
      level: "College",
      degree: "BS Computer Science",
      year_graduate: "06-2022",
    },
  ],
  experience: [
    {
      company: "MMCL",
      position: "Software Engineer",
      date_started: "01-2023",
      date_ended: "Present",
    },
  ],
  credentials: [
    {
      title: "AWS Certified Cloud Practitioner",
      authority: "Amazon Web Services",
    },
  ],
  governmentIds: [
    { id_type: "TIN", number: "123-456-789" },
    { id_type: "SSS", number: "00-1234567-8" },
  ],
  socialMedia: [
    { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
  ],
  attachments: [{ name: "Resume.pdf" }],
};

function ProfileTabs() {
  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="bg-transparent">
        <TabsTrigger
          value="profile"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Education
        </TabsTrigger>
        <TabsTrigger
          value="experience"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Experience
        </TabsTrigger>
        <TabsTrigger
          value="credentials"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Credentials
        </TabsTrigger>
        <TabsTrigger
          value="government-ids"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Government IDs
        </TabsTrigger>
        <TabsTrigger
          value="social-media"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Social Media
        </TabsTrigger>
        <TabsTrigger
          value="attachments"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Attachments
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">Name</label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.firstName} {user.personal.lastName}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">Email</label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.email}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">Mobile</label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.mobile}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">
              Landline
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.landline}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">Gender</label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.gender}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4 md:col-span-2">
            <label className="text-xs font-medium text-slate-600">
              Address
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.address}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">
              Birthplace
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.birthplace}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">
              Civil Status
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.civil_status}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">
              Religion
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.religion}
            </p>
          </div>

          <div className="space-y-1 rounded-lg border border-slate-200 bg-white p-4">
            <label className="text-xs font-medium text-slate-600">
              Citizenship
            </label>
            <p className="text-sm font-semibold text-slate-900">
              {user.personal.citizenship}
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="education">
        <div className="flex flex-col">
          {user.education.map((record, index) => (
            <div
              key={`${record.institution}-${index}`}
              className="mb-4 w-full rounded-lg border bg-white p-4"
            >
              <h3 className="text-md font-semibold">
                {record.level} in {record.degree}
              </h3>
              <p className="text-sm text-gray-600">{record.institution}</p>
              <p className="text-sm text-gray-600">{record.year_graduate}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="experience">
        <div className="flex flex-col">
          {user.experience.map((record, index) => (
            <div
              key={`${record.company}-${index}`}
              className="mb-4 flex w-full flex-col gap-2 rounded-lg border bg-white p-4"
            >
              <h3 className="text-md font-semibold">{record.position}</h3>
              <p className="text-sm text-gray-600">{record.company}</p>
              <p className="text-sm text-gray-600">
                {getDateFromShortDate(record.date_started)} -{" "}
                {record.date_ended === "Present"
                  ? "Present"
                  : getDateFromShortDate(record.date_ended)}
              </p>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="credentials">
        <div className="space-y-6">
          {user.credentials.map((record, index) => (
            <div
              key={`${record.title}-${index}`}
              className="rounded-lg border bg-white p-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Title
                  </label>
                  <p className="text-sm font-semibold text-slate-900">
                    {record.title}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-600">
                    Authority
                  </label>
                  <p className="text-sm font-semibold text-slate-900">
                    {record.authority}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="government-ids">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {user.governmentIds.map((record, index) => (
              <div
                className="rounded-lg border border-slate-200 bg-white p-4"
                key={`${record.id_type}-${index}`}
              >
                <label className="text-xs font-medium text-slate-600">
                  {record.id_type}
                </label>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold text-slate-900">
                    {record.number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="social-media">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {user.socialMedia.map((record, index) => (
              <div
                key={`${record.platform}-${index}`}
                className="space-y-1 rounded-lg border border-slate-200 bg-white p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {record.platform}
                </p>
                <a
                  href={record.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  {record.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="attachments">
        <div className="space-y-6">
          <div className="space-y-2">
            {user.attachments.map((record, index) => (
              <div
                key={`${record.name}-${index}`}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700"
              >
                {record.name}
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function CreateProfileCTA() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon" className="bg-red-">
          <User className="h-16 w-16 text-red-500" />
        </EmptyMedia>
        <EmptyTitle>Complete Your Profile</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t completed your profile yet. Get started by adding
          your information to apply for positions.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button className="bg-red-600" asChild>
          <Link href="/profile/create">Create Profile</Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
export default function ApplicantProfile() {
  const hasProfile = Object.keys(user).length > 0;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <ApplicantNavbar />
      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        {!hasProfile ? (
          <CreateProfileCTA />
        ) : (
          <div className="mx-auto max-w-5xl space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                My Profile
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Review your profile information by section.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex justify-between">
                <h2 className="mb-6 text-lg font-semibold text-slate-900">
                  Profile Details
                </h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
              <ProfileTabs />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
