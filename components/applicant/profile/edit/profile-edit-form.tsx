"use client";

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
      <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
        <TabsList className="bg-transparent h-auto p-0 flex justify-start border-b border-slate-200 rounded-none min-w-max">
          <TabsTrigger
            value="personal"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Personal
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="credentials"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Credentials
          </TabsTrigger>
          <TabsTrigger
            value="government-ids"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Government IDs
          </TabsTrigger>
          <TabsTrigger
            value="social-media"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Social Media
          </TabsTrigger>
          <TabsTrigger
            value="attachments"
            className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 data-[state=active]:border-red-600 data-[state=active]:bg-transparent data-[state=active]:text-red-700 whitespace-nowrap transition-all"
          >
            Attachments
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-6 px-1">
        <TabsContent value="personal" className="focus-visible:outline-none">
          <PersonalForm />
        </TabsContent>

        <TabsContent value="education" className="focus-visible:outline-none">
          <EducationForm />
        </TabsContent>

        <TabsContent value="experience" className="focus-visible:outline-none">
          <ExperienceForm />
        </TabsContent>

        <TabsContent value="credentials" className="focus-visible:outline-none">
          <CredentialForm />
        </TabsContent>

        <TabsContent value="government-ids" className="focus-visible:outline-none">
          <GovIdForm />
        </TabsContent>

        <TabsContent value="social-media" className="focus-visible:outline-none">
          <SocialMediaForm />
        </TabsContent>

        <TabsContent value="attachments" className="focus-visible:outline-none">
          <AttachmentForm />
        </TabsContent>
      </div>
    </Tabs>
  );
}