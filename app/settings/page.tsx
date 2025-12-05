import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountTab from "@/components/pages/settings/account-tab";
import NotificationsTab from "@/components/pages/settings/notifications-tab";
import PreferenceTab from "@/components/pages/settings/preference-tab";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preference">Preference</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          <TabsContent value="preference">
            <PreferenceTab />
          </TabsContent>
          <TabsContent value="privacy">
            <div>Privacy Settings Content</div>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
