import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalForm from "@/components/applicant/profile/forms/personal-form";
import EducationForm from "@/components/applicant/profile/forms/education-form";
import ExperienceForm from "@/components/applicant/profile/forms/experience-form";
import CredentialForm from "@/components/applicant/profile/forms/credential-form";
import GovIdForm from "@/components/applicant/profile/forms/gov-id-form";
import SocialMediaForm from "@/components/applicant/profile/forms/social-media-form";
import AttachmentForm from "@/components/applicant/profile/forms/attachment-form";

export default function ProfileEditForm() {
  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="bg-transparent">
        <TabsTrigger
          value="personal"
          className="rounded-2xl border-black/10 px-4 py-2 text-gray-600 data-[state=active]:border-red-200 data-[state=active]:bg-red-100 data-[state=active]:text-red-700"
        >
          Personal
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
  );
}
