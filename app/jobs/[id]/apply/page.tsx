import AttachmentsContent from "@/components/applicant/jobs/apply/attachments-content";
import CredentialsContent from "@/components/applicant/jobs/apply/credentials-content";
import EducationContent from "@/components/applicant/jobs/apply/education-content";
import ExperienceContent from "@/components/applicant/jobs/apply/experience-content";
import GovernmentIDContent from "@/components/applicant/jobs/apply/government-id-content";
import PersonalContent from "@/components/applicant/jobs/apply/personal-content";
import SocialMediaContent from "@/components/applicant/jobs/apply/social-media-content";
import ApplicantNavbar from "@/components/applicant/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const tabs = [
  "Personal",
  "Education",
  "Experience",
  "Credentials",
  "Government IDs",
  "Social Media",
  "Attachments",
];

const user = {
  personal: {
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@mail.com",
    mobile: "+1 234 567 890",
    landline: "+1 234 567 891",
    address: "123 Main St, Anytown, USA",
    birthplace: "Anytown, USA",
    civil_status: "Single",
    gender: "Male",
    religion: "None",
    citizenship: "Filipino",
  },
  education: [
    {
      institution: "University of the Philippines",
      level: "Bachelor's",
      degree: "Computer Science",
      status: "Graduated",
      year_graduate: "2020",
    },
    {
      institution: "Anytown High School",
      level: "High School",
      degree: "General Education",
      status: "Graduated",
      year_graduate: "2016",
    },
  ],
  experience: [
    {
      company: "Tech Company",
      position: "Software Engineer",
      department: "IT",
      courses_handled: [],
      date_started: "12-2020",
      date_ended: "12-2023",
    },
    {
      company: "Another Tech Company",
      position: "Junior Software Engineer",
      department: "IT",
      courses_handled: [],
      date_started: "01-2021",
      date_ended: "11-2020",
    },
  ],
  credentials: [
    {
      title: "Certified Software Engineer",
      authority: "Tech Certification Board",
      number: "CSE-123456",
      date_issued: "12-2020",
      date_expired: "12-2025",
    },
  ],
  ids: [
    {
      type: "SSS",
      number: "123-45-6789",
    },
    {
      type: "PhilHealth",
      number: "12-34567890-1",
    },
  ],
  media: [
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/in/johndoe",
    },
    {
      platform: "GitHub",
      link: "https://www.github.com/johndoe",
    },
  ],
  attachments: [
    {
      name: "Resume.pdf",
      file: new File([""], "Resume.pdf", { type: "application/pdf" }),
    },
    {
      name: "CoverLetter.pdf",
      file: new File([""], "CoverLetter.pdf", { type: "application/pdf" }),
    },
  ],
};

const tabValue = (tab: string) => tab.toLowerCase().replace(/\s+/g, "-");

export default function ApplyPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <ApplicantNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 mb-2 text-xs font-medium text-red-700">
              You are applying for
            </span>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Software Engineer
            </h1>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <section className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  Application Form
                </h2>
                <Tabs defaultValue={tabValue(tabs[0])} className="w-full">
                  <TabsList className="bg-transparent">
                    {tabs.map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tabValue(tab)}
                        className="rounded-2xl px-4 py-2 text-gray-600 border-black/10 data-[state=active]:text-red-700 data-[state=active]:bg-red-100 data-[state=active]:border-red-200"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="personal">
                    <PersonalContent personal={user.personal} />
                  </TabsContent>
                  <TabsContent value="education">
                    <EducationContent education={user.education} />
                  </TabsContent>
                  <TabsContent value="experience">
                    <ExperienceContent experience={user.experience} />
                  </TabsContent>
                  <TabsContent value="credentials">
                    <CredentialsContent credentials={user.credentials} />
                  </TabsContent>
                  <TabsContent value="government-ids">
                    <GovernmentIDContent ids={user.ids} />
                  </TabsContent>
                  <TabsContent value="social-media">
                    <SocialMediaContent media={user.media} />
                  </TabsContent>
                  <TabsContent value="attachments">
                    <AttachmentsContent attachments={user.attachments} />
                  </TabsContent>
                </Tabs>
                <Separator className="my-6" />
                <section className="space-y-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      Why should we hire you?
                    </h3>
                  </div>
                  <textarea
                    name="pitch"
                    id="pitch"
                    placeholder="Tell us about your skills and character that makes you a great candidate for this position."
                    className="w-full min-h-32 rounded-lg border border-slate-200 p-3 text-sm shadow-sm resize-none"
                  />
                </section>
              </article>
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Please review your details first before submitting an
                  application
                </h3>

                <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <input
                    type="checkbox"
                    id="certification"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600"
                  />
                  <label
                    htmlFor="certification"
                    className="text-xs leading-relaxed text-slate-700"
                  >
                    I hereby certify that the above information is true and
                    correct to the best of my knowledge. Any misdeclaration of
                    information shall be subject to my automatic
                    disqualification from any available position I am qualified
                    to handle or termination upon hiring.
                  </label>
                </div>

                <button className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Application
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
