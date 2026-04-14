"use client";

// React
import { useEffect, useState } from "react";

// Next.js
import { useRouter } from "next/navigation";

// Dashboard sections
import OverviewCard from "@/components/applicant/dashboard/overview-card";
import RecentApplications from "@/components/applicant/dashboard/recent-applications";
import ExploreJobs from "@/components/applicant/dashboard/explore-jobs";
import InterviewCard from "@/components/applicant/dashboard/interview-card";

export default function DashboardPage() {
  return (
    // Main dashboard surface
    <section className="w-full ">
      <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
        {/* Header: personalized greeting and context text */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is what is happening with your career search today.
          </p>
        </header>

        {/* Responsive content grid: main feed + interview sidebar */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
          {/* Left/Main Column */}
          <div className="flex flex-col gap-6 xl:col-span-8">
            <OverviewCard />
            <RecentApplications />
            <ExploreJobs />
          </div>

          {/* Right Column */}
          <aside className="xl:col-span-4 xl:sticky xl:top-6">
            <InterviewCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
