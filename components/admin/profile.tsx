import Link from "next/link";
import AdminNavbar from "./navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminProfile = {
  fullName: "Daniel Mark S. Arabusing",
  email: "admin@mmcl.edu.ph",
  phone: "+63 917 000 1122",
  department: "System Administration",
  role: "Platform Administrator",
  employeeId: "ADM-2020-003",
  location: "Makati Campus",
  status: "Active",
  joinedDate: "June 10, 2020",
  lastLogin: "March 17, 2026, 9:10 AM",
};

const quickPermissions = [
  "Manage Users",
  "Approve Job Posts",
  "View Audit Logs",
  "Configure Access Policies",
];

export default function AdminProfile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-1 flex gap-2">
                  <Badge className="bg-red-100 text-red-700">Admin</Badge>
                  <Badge className="bg-emerald-100 text-emerald-700">
                    {adminProfile.status}
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  {adminProfile.fullName}
                </h1>
                <p className="text-sm text-slate-600">{adminProfile.role}</p>
              </div>

              <Button asChild variant="outline" size="sm">
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
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
                      {adminProfile.fullName}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Employee ID</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.employeeId}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.email}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.phone}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Department</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.department}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-xs text-slate-500">Location</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.location}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4 md:col-span-2">
                    <p className="text-xs text-slate-500">Joined Date</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.joinedDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Account Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500">Last Login</p>
                    <p className="text-sm font-semibold text-slate-900">
                      {adminProfile.lastLogin}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickPermissions.map((permission) => (
                      <Badge key={permission} variant="outline">
                        {permission}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <Link href="/profile/edit">Edit Profile</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Administration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/accounts">Manage Accounts</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/logs">View Activity Logs</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/dashboard">Open Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
