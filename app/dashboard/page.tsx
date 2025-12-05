import OverviewCard from "@/components/pages/dashboard/overview-card";
import UpcomingInterviewCard from "@/components/pages/dashboard/upcoming-interview-card";
import RecentApplicationsCard from "@/components/pages/dashboard/recent-applications-card";
import DashboardResume from "@/components/pages/dashboard/dashboard-resume";
import ExploreJobsCard from "@/components/pages/dashboard/explore-jobs-card";
import {
  overviewData,
  upcomingInterviewData,
  recentApplicationsData,
  dashboardResumeData,
  exploreJobsData,
} from "../sample-data";

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex flex-col gap-4 col-span-2">
        <OverviewCard data={overviewData} />
        <RecentApplicationsCard data={recentApplicationsData} />
        <DashboardResume data={dashboardResumeData} />
        <ExploreJobsCard data={exploreJobsData} />
      </div>

      <UpcomingInterviewCard data={upcomingInterviewData} />
    </div>
  );
}
