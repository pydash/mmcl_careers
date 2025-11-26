import { AppSidebar } from "@/components/app-sidebar";
import OverviewCard from "@/components/pages/dashboard/overview-card";
import UpcomingInterviewCard from "@/components/pages/dashboard/upcoming-interview-card";
import RecentApplicationsCard from "@/components/pages/dashboard/recent-applications-card";
import DashboardResume from "@/components/pages/dashboard/dashboard-resume";
import ExploreJobsCard from "@/components/pages/dashboard/explore-jobs-card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserPlus, MessagesSquare, HandCoins, Handshake } from "lucide-react";

export default function Page() {
  const overviewData = [
    { title: "Total Users", content: "1,234", icon: UserPlus },
    { title: "Active Sessions", content: "567", icon: MessagesSquare },
    { title: "New Signups", content: "89", icon: Handshake },
    { title: "Revenue", content: "$12,345", icon: HandCoins },
  ];
  const upcomingInterviewData = [
    {
      position: "Frontend Developer",
      time: "10:00 AM",
      date: "7 Oct 2024",
    },
    {
      position: "Backend Developer",
      time: "2:00 PM",
      date: "8 Oct 2024",
    },
  ];

  const recentApplicationsData = [
    {
      jobTitle: "Software Engineer",
      status: "Pending",
      dateApplied: "5 Oct 2024",
    },
    { jobTitle: "Data Analyst", status: "Reviewed", dateApplied: "3 Oct 2024" },
  ];

  const dashboardResumeData = {
    fileName: "myresume.pdf",
    uploadDate: "1 Oct 2024",
  };

  const exploreJobsData = [
    { jobTitle: "Full Stack Developer", tags: ["JavaScript", "React"] },
    { jobTitle: "UI/UX Designer", tags: ["Figma", "Adobe XD"] },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="grid grid-cols-3 p-5 gap-4">
          <div className="flex flex-col gap-4 col-span-2">
            <OverviewCard data={overviewData} />
            <RecentApplicationsCard data={recentApplicationsData} />
            <DashboardResume data={dashboardResumeData} />
            <ExploreJobsCard data={exploreJobsData} />
          </div>
          {/* <div className="bg-gray-200 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
          <UpcomingInterviewCard data={upcomingInterviewData} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
