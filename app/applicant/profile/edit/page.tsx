"use client";

import { useProfile } from "@/hooks/applicant/profile/useProfileGetter";
import EmptyProfile from "@/components/applicant/profile/empty-profile";
import PersonalTab from "@/components/applicant/profile/edit/personal-tab";
import EducationTab from "@/components/applicant/profile/edit/education-tab";
import WorkTab from "@/components/applicant/profile/edit/work-tab";
import CredentialsTab from "@/components/applicant/profile/edit/credentials-tab";
import GovernmentIdsTab from "@/components/applicant/profile/edit/government-ids-tab";
import MediaTab from "@/components/applicant/profile/edit/media-tab";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function EditProfilePage() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  }

  if (!profile) {
    return <EmptyProfile />;
  }

  return (
    <main className="min-w-100 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        <Button variant="outline" asChild>
          <Link href="/applicant/profile">Cancel</Link>
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="bg-gray-50 p-1 rounded-lg border border-gray-200 mb-6 inline-flex">
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
            value="work"
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
            value="media"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
          >
            Social Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <PersonalTab profile={profile.profile} />
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <EducationTab education={profile.education_background} />
        </TabsContent>

        <TabsContent value="work" className="space-y-6">
          <WorkTab workExperience={profile.work_experience} />
        </TabsContent>

        <TabsContent value="credentials" className="space-y-6">
          <CredentialsTab credentials={profile.credentials} />
        </TabsContent>

        <TabsContent value="government_ids" className="space-y-6">
          <GovernmentIdsTab governmentIds={profile.government_ids} />
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <MediaTab mediaAccounts={profile.media_accounts} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
