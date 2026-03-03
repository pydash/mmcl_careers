"use client";

import ExploreJobs from "@/components/applicant/dashboard/explore-jobs";
import InterviewCard from "@/components/applicant/dashboard/interview-card";
import OverviewCard from "@/components/applicant/dashboard/overview-card";
import RecentApplications from "@/components/applicant/dashboard/recent-applications";

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="grid grid-cols-[6fr_4fr] gap-4 p-4">
        <div className="flex flex-col gap-4">
          <OverviewCard />
          <RecentApplications />
          <ExploreJobs />
        </div>
        <InterviewCard />
      </div>
    </main>
  );
}
