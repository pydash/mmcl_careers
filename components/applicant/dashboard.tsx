"use client";

import ApplicantNavbar from "./navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApplicantDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ApplicantNavbar />

      <main className="flex-1 p-6 md:p-10">
        <div className="max-w-6xl mx-auto space-y-6">
          <section>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track your applications, discover new opportunities, and keep your
              profile updated.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Applications Submitted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">6</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Under Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Interview Invites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">1</p>
              </CardContent>
            </Card>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span>
                    Application submitted for Faculty – Computer Science
                  </span>
                  <span className="text-gray-400">2d ago</span>
                </div>
                <div className="flex items-start justify-between border-b border-gray-100 pb-2">
                  <span>
                    Status updated: Research Assistant is now Under Review
                  </span>
                  <span className="text-gray-400">4d ago</span>
                </div>
                <div className="flex items-start justify-between">
                  <span>
                    Interview invitation received for Guidance Counselor
                  </span>
                  <span className="text-gray-400">1w ago</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <a href="/jobs">Browse Jobs</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="/applications">View Applications</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href="/settings">Update Profile</a>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
