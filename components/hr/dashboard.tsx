"use client";

import HRNavbar from "@/components/hr/ui/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardData } from "@/hooks/dashboard/useDashboardData";
import { getDate } from "@/lib/datetime.helpers";
import { BriefcaseIcon, Users, Clock, CheckCircle } from "lucide-react";

export default function HrDashboard() {
  const { data, loading, error } = useDashboardData();

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <HRNavbar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-lg bg-red-50 p-4 text-red-800">
              Error loading dashboard: {error.message}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <HRNavbar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage job postings, applicants, and recruitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <BriefcaseIcon className="h-4 w-4 text-red-600" />
                  Open Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : (data?.open_jobs ?? 0)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Active job postings
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="h-4 w-4 text-red-600" />
                  Total Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : (data?.total_applications ?? 0)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Received this month
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : (data?.pending_applications ?? 0)}
                </div>
                <p className="text-xs text-gray-500 mt-1">Awaiting screening</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {loading ? "..." : (data?.total_users ?? 0)}
                </div>
                <p className="text-xs text-gray-500 mt-1">Registered users</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Latest applicants for open positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading applications...
                  </div>
                ) : data?.recent_applications &&
                  data.recent_applications.length > 0 ? (
                  <div className="space-y-4">
                    {data.recent_applications.map((app: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {[app.first_name, app.middle_name, app.last_name]
                              .filter(Boolean)
                              .join(" ") || "Unnamed Applicant"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {app.position || "Position"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            {app.applied_at ? getDate(app.applied_at) : "N/A"}
                          </p>
                          <p
                            className={`text-xs font-medium mt-1 ${
                              app.status === "New"
                                ? "text-blue-600"
                                : app.status === "Interview"
                                  ? "text-green-600"
                                  : "text-yellow-600"
                            }`}
                          >
                            {app.status || "Pending"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No recent applications
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common HR tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Post New Job
                </Button>
                <Button variant="outline" className="w-full">
                  Review Applications
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
