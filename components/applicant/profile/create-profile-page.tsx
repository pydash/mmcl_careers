import ApplicantNavbar from "@/components/applicant/navbar";
import PersonalForm from "@/components/applicant/profile/forms/personal-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EducationForm from "./forms/education-form";
import ExperienceForm from "./forms/experience-form";
import CredentialForm from "./forms/credential-form";
import GovIdForm from "./forms/gov-id-form";
import SocialMediaContent from "../jobs/apply/social-media-content";
import SocialMediaForm from "./forms/social-media-form";
import AttachmentForm from "./forms/attachment-form";

const tabs = [
  "Personal",
  "Education",
  "Experience",
  "Credentials",
  "Government IDs",
  "Social Media",
  "Attachments",
];

const tabValue = (tab: string) => tab.toLowerCase().replace(/\s+/g, "-");

export default function ApplicantCreateProfile() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <ApplicantNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Create Profile
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Complete your profile details so you can apply for available jobs.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-lg font-semibold text-slate-900">
              Profile Information
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
                <PersonalForm />
              </TabsContent>

              <TabsContent value="education">
                <EducationForm />
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm />
              </TabsContent>

              <TabsContent value="credentials">
                <CredentialForm />
              </TabsContent>

              <TabsContent value="government-ids">
                <GovIdForm />
              </TabsContent>

              <TabsContent value="social-media">
                <SocialMediaForm />
              </TabsContent>

              <TabsContent value="attachments">
                <AttachmentForm />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
    </div>
  );
}
