import ApplicantNavbar from "@/components/applicant/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { User, FileText, Globe, Shield, Award, Briefcase, GraduationCap } from "lucide-react";
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
  const tabTriggers = [
    { value: "profile", label: "Personal", icon: User },
    { value: "education", label: "Education", icon: GraduationCap },
    { value: "experience", label: "Experience", icon: Briefcase },
    { value: "credentials", label: "Credentials", icon: Award },
    { value: "government-ids", label: "Gov IDs", icon: Shield },
    { value: "social-media", label: "Social", icon: Globe },
    { value: "attachments", label: "Files", icon: FileText },
  ];

  return (
    <Tabs defaultValue="profile" className="w-full">
   
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <TabsList className="bg-transparent h-auto p-0 flex justify-start border-b border-slate-200 rounded-none min-w-max">
          {tabTriggers.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-gray-600 whitespace-nowrap transition-all data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 flex items-center gap-2"
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className="mt-6">
        <TabsContent value="profile" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { label: "Name", value: `${user.personal.firstName} ${user.personal.lastName}` },
              { label: "Email", value: user.personal.email, breakAll: true },
              { label: "Mobile", value: user.personal.mobile },
              { label: "Landline", value: user.personal.landline },
              { label: "Gender", value: user.personal.gender },
              { label: "Address", value: user.personal.address, fullWidth: true },
              { label: "Birthplace", value: user.personal.birthplace },
              { label: "Civil Status", value: user.personal.civil_status },
              { label: "Religion", value: user.personal.religion },
              { label: "Citizenship", value: user.personal.citizenship },
            ].map((field, idx) => (
              <div
                key={idx}
                className={`space-y-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm ${
                  field.fullWidth ? "sm:col-span-2" : ""
                }`}
              >
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {field.label}
                </label>
                <p className={`text-sm font-semibold text-slate-900 ${field.breakAll ? "break-all" : "break-words"}`}>
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education" className="focus-visible:outline-none">
          <div className="space-y-4">
            {user.education.map((record, index) => (
              <div key={index} className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm md:text-base font-bold text-slate-900">
                  {record.level} in {record.degree}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{record.institution}</p>
                <p className="text-xs text-gray-400 mt-1 font-medium">{record.year_graduate}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experience" className="focus-visible:outline-none">
          <div className="space-y-4">
            {user.experience.map((record, index) => (
              <div key={index} className="flex w-full flex-col gap-1 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h3 className="text-sm md:text-base font-bold text-slate-900">{record.position}</h3>
                <p className="text-sm text-gray-600">{record.company}</p>
                <p className="text-xs text-red-600 font-semibold mt-1">
                  {getDateFromShortDate(record.date_started)} — {record.date_ended}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="credentials" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.credentials.map((record, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Authority</label>
                <p className="text-sm font-semibold text-slate-900 mb-2">{record.authority}</p>
                <div className="pt-2 border-t border-slate-100">
                   <p className="text-sm text-slate-700">{record.title}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="government-ids" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.governmentIds.map((record, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{record.id_type}</label>
                <p className="text-sm font-mono font-bold text-slate-900 break-all">{record.number}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social-media" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.socialMedia.map((record, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase">{record.platform}</p>
                <a
                  href={record.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-blue-600 hover:underline break-all mt-1 block"
                >
                  {record.url}
                </a>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="attachments" className="focus-visible:outline-none">
          <div className="space-y-2">
            {user.attachments.map((record, index) => (
              <div key={index} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <FileText className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-slate-700 truncate">{record.name}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}

function CreateProfileCTA() {
  return (
    <Empty className="mt-12 lg:mt-0">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <User className="h-16 w-16 text-red-500" />
        </EmptyMedia>
        <EmptyTitle>Complete Your Profile</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t completed your profile yet. Get started by adding
          your information to apply for positions.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex flex-col sm:flex-row justify-center gap-2">
        <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto" asChild>
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
      <main className="flex-1 lg:ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        {!hasProfile ? (
          <CreateProfileCTA />
        ) : (
          <div className="mx-auto max-w-5xl space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 mt-12 lg:mt-0">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                My Profile
              </h1>
              <p className="mt-2 text-sm text-slate-600">
                Review your profile information by section.
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Profile Details
                </h2>
                <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
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