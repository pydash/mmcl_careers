"use client";

import ApplicantNavbar from "./navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ApplicantDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ApplicantNavbar />

    
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto space-y-6">
       
          <section className="mt-12 lg:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track your applications, discover new opportunities, and keep your
              profile updated.
            </p>
          </section>

          
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Applications Submitted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">6</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Under Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Interview Invites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">1</p>
              </CardContent>
            </Card>
          </section>

          {/* Activity and Actions Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="leading-snug">
                    Application submitted for <strong>Faculty – Computer Science</strong>
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">2d ago</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="leading-snug">
                    Status updated: <strong>Research Assistant</strong> is now Under Review
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">4d ago</span>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="leading-snug">
                    Interview invitation received for <strong>Guidance Counselor</strong>
                  </span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">1w ago</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Button asChild className="w-full bg-red-600 hover:bg-red-700 transition-colors">
                  <Link href="/jobs">Browse Jobs</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/applications">View Applications</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/profile/edit">Update Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}