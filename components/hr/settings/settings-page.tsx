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

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  Settings
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Manage your HR account preferences, notifications, and
                  security.
                </p>
              </div>
            </div>
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
                    <Input id="display-name" defaultValue="Maria Santos" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="work-email">Work Email</Label>
                    <Input
                      id="work-email"
                      type="email"
                      defaultValue="maria.santos@mmcl.edu.ph"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-number">Contact Number</Label>
                    <Input
                      id="contact-number"
                      defaultValue="+63 917 000 4455"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Submit Changes
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
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Link href="/applications">Review Applications</Link>
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
                {[
                  {
                    title: "New application alerts",
                    description:
                      "Receive updates when a new applicant submits an application.",
                    enabled: true,
                  },
                  {
                    title: "Interview reminders",
                    description: "Get reminders before scheduled interviews.",
                    enabled: true,
                  },
                  {
                    title: "Job posting expiration alerts",
                    description:
                      "Be notified when a job post is nearing its deadline.",
                    enabled: false,
                  },
                ].map((item) => (
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
                    Last updated 30 days ago.
                  </p>
                  <Button variant="outline" className="mt-3">
                    Change Password
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
