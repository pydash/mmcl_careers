import Link from "next/link";
import AdminNavbar from "@/components/admin/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const adminSettings = {
  displayName: "Daniel Mark S. Arabusing",
  workEmail: "admin@mmcl.edu.ph",
  contactNumber: "+63 917 000 1122",
  timezone: "Asia/Manila (GMT+8)",
  lastPasswordUpdate: "February 20, 2026",
  twoFactorEnabled: true,
};

const notificationPreferences = [
  {
    title: "Critical system alerts",
    description: "Get notified about platform outages and critical incidents.",
    enabled: true,
  },
  {
    title: "User account activity",
    description: "Receive updates for account lockouts and privilege changes.",
    enabled: true,
  },
  {
    title: "Weekly admin digest",
    description: "Summary of jobs, applications, and account statistics.",
    enabled: false,
  },
];

export default function AdminSettings() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage your administrator account, security, and platform
              preferences.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="border-slate-200 lg:col-span-2">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input
                      id="display-name"
                      defaultValue={adminSettings.displayName}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work-email">Work Email</Label>
                    <Input
                      id="work-email"
                      type="email"
                      defaultValue={adminSettings.workEmail}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-number">Contact Number</Label>
                    <Input
                      id="contact-number"
                      defaultValue={adminSettings.contactNumber}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      defaultValue={adminSettings.timezone}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="bg-red-600 hover:bg-red-700">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/profile">View Profile</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/accounts">Manage Accounts</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/logs">View Logs</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notificationPreferences.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.description}
                      </p>
                    </div>

                    <Badge
                      className={
                        item.enabled
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700"
                      }
                    >
                      {item.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Password
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Last updated {adminSettings.lastPasswordUpdate}.
                  </p>
                  <Button variant="outline" className="mt-3">
                    Change Password
                  </Button>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Two-Factor Authentication
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    {adminSettings.twoFactorEnabled
                      ? "Currently enabled for your account."
                      : "Currently disabled for your account."}
                  </p>
                  <Button variant="outline" className="mt-3">
                    {adminSettings.twoFactorEnabled
                      ? "Manage 2FA"
                      : "Enable 2FA"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
