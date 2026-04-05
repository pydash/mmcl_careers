import Link from "next/link";
import HRNavbar from "@/components/hr/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HRSettings() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      {/* Main Content: Adaptive margin for sidebar and responsive padding */}
      <main className="flex-1 lg:ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          {/* Header Section */}
          <section className="mt-12 lg:mt-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 md:text-3xl tracking-tight">
                  Settings
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  Manage your HR account preferences, notifications, and
                  security.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Account Settings Form */}
            <Card className="border-slate-200 lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="display-name" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Display Name
                    </Label>
                    <Input id="display-name" defaultValue="Maria Santos" className="border-slate-200 focus-visible:ring-red-600/20" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work-email" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Work Email
                    </Label>
                    <Input
                      id="work-email"
                      type="email"
                      defaultValue="maria.santos@mmcl.edu.ph"
                      className="border-slate-200 focus-visible:ring-red-600/20"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contact-number" className="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Contact Number
                    </Label>
                    <Input
                      id="contact-number"
                      defaultValue="+63 917 000 4455"
                      className="border-slate-200 focus-visible:ring-red-600/20"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-8 border-t border-slate-100 pt-6">
                  <Button className="bg-red-600 hover:bg-red-700 font-bold px-8 transition-colors">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links Sidebar */}
            <Card className="border-slate-200 shadow-sm h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50 transition-colors">
                  <Link href="/profile">View Profile</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50 transition-colors">
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start border-slate-200 hover:bg-slate-50 transition-colors">
                  <Link href="/applications">Review Applications</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Notifications Toggle Simulation */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "New application alerts",
                    description: "Receive updates when a new applicant submits an application.",
                    enabled: true,
                  },
                  {
                    title: "Interview reminders",
                    description: "Get reminders before scheduled interviews.",
                    enabled: true,
                  },
                  {
                    title: "Job post expiration",
                    description: "Be notified when a job post is nearing its deadline.",
                    enabled: false,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/30 p-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-slate-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <Badge
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.enabled
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shadow-none"
                          : "bg-slate-200 text-slate-600 hover:bg-slate-200 shadow-none"
                      }`}
                    >
                      {item.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Section */}
            <Card className="border-slate-200 shadow-sm h-fit">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4">
                  <p className="text-sm font-bold text-slate-900">
                    Password Management
                  </p>
                  <p className="mt-1 text-xs text-slate-500 font-medium italic">
                    Last updated 30 days ago.
                  </p>
                  <Button variant="outline" className="mt-4 w-full sm:w-auto border-slate-200 hover:bg-white transition-all active:scale-95">
                    Change Password
                  </Button>
                </div>
                
                <div className="rounded-xl border border-red-50 bg-red-50/20 p-4">
                  <p className="text-sm font-bold text-red-900">
                    Danger Zone
                  </p>
                  <p className="mt-1 text-xs text-red-600">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="ghost" className="mt-4 p-0 text-red-600 font-bold hover:bg-transparent hover:text-red-700 underline underline-offset-4">
                    Deactivate Account
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