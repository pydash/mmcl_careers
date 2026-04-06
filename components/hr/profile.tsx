import Link from "next/link";
import HRNavbar from "@/components/hr/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const hrProfile = {
  fullName: "Maria Santos",
  email: "maria.santos@mmcl.edu.ph",
  phone: "+63 917 000 4455",
  department: "Human Resources",
  position: "HR Recruitment Officer",
  location: "Makati Campus",
  employeeId: "HR-2021-014",
  status: "Active",
  joinedDate: "March 12, 2021",
  lastLogin: "March 15, 2026, 8:42 AM",
};

export default function HrProfile() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <HRNavbar />

      <main className="flex-1 ml-64 px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex gap-2 mb-1">
                    <Badge className="bg-red-100 text-red-700">HR Team</Badge>
                    <Badge className="bg-emerald-100 text-emerald-700">
                      {hrProfile.status}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                    {hrProfile.fullName}
                  </h1>
                  <p className="text-sm text-slate-600">{hrProfile.position}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/profile/edit">Edit Profile</Link>
                </Button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="border-slate-200 lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Full Name</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.fullName}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Employee ID</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.employeeId}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.email}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.phone}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.department}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.location}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                    <p className="text-xs text-slate-500">Joined Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.joinedDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Recruitment Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <span className="text-sm text-slate-600">Open Jobs</span>
                    <span className="text-sm font-semibold text-slate-900">
                      8
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <span className="text-sm text-slate-600">
                      Pending Reviews
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      34
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                    <span className="text-sm text-slate-600">Interviews</span>
                    <span className="text-sm font-semibold text-slate-900">
                      12
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Account Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500">Last Login</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {hrProfile.lastLogin}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">View Applications</Badge>
                    <Badge variant="outline">Manage Job Posts</Badge>
                    <Badge variant="outline">Schedule Interviews</Badge>
                  </div>

                  <div className="pt-2">
                    <Button
                      asChild
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <Link href="/profile/edit">Edit Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
