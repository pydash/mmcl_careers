import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalTab from "@/components/pages/profile/personal-tab";
import EducationalTab from "@/components/pages/profile/educational-tab";
import CredentialsTab from "@/components/pages/profile/credentials-tab";
import EmploymentTab from "@/components/pages/profile/employment-tab";
import SkillsTab from "@/components/pages/profile/skills-tab";
import AttachmentsTab from "@/components/pages/profile/attachments-tab";

export default function Page() {
  return (
    <>
      <main className="p-6">
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-6 items-center">
            <Avatar className="size-24">
              <AvatarImage src="/path/to/image.jpg" alt="User Name" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="mt-4 text-2xl font-bold">User Name</h1>
              <p className="mt-2 text-muted-foreground">
                This is the user profile page.
              </p>
            </div>
          </div>
          <Button className="mt-4">
            <SquarePen className="mr-2" />
            Edit Profile
          </Button>
        </div>
        <Tabs defaultValue="personal">
          <TabsList>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="educational">Education</TabsTrigger>
            <TabsTrigger value="licenses">Credentials</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="attachments">Attachments</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="mt-4">
            <PersonalTab />
          </TabsContent>
          <TabsContent value="educational" className="mt-4">
            <EducationalTab />
          </TabsContent>
          <TabsContent value="licenses" className="mt-4">
            <CredentialsTab />
          </TabsContent>
          <TabsContent value="employment" className="mt-4">
            <EmploymentTab />
          </TabsContent>
          <TabsContent value="skills" className="mt-4">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="attachments" className="mt-4">
            <AttachmentsTab />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
