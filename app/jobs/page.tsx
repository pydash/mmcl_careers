import { AppSidebar } from "@/components/app-sidebar";
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
import SearchBar from "@/components/search-bar";
import JobsFilter from "@/components/pages/browse-jobs/jobs-filter";
import JobsView from "@/components/pages/browse-jobs/jobs-view";
import JobsSort from "@/components/pages/browse-jobs/jobs-sort";
import GridCard from "@/components/grid-card";
import JobPagination from "@/components/pages/browse-jobs/job-pagination";

export default function Page() {
  const jobsData = [
    {
      imgPath: "/placeholder.png",
      badges: ["Full-time", "Remote"],
      title: "Senior Software Engineer",
      description: "Develop and maintain software applications.",
      salaryRange: "₱50,000 - ₱70,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Part-time", "On-site"],
      title: "Junior Developer",
      description: "Assist in the development of software applications.",
      salaryRange: "₱30,000 - ₱45,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Contract", "Hybrid"],
      title: "UI/UX Designer",
      description: "Design user interfaces and improve user experience.",
      salaryRange: "₱40,000 - ₱60,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Full-time", "Remote"],
      title: "Data Scientist",
      description: "Analyze and interpret complex data sets.",
      salaryRange: "₱60,000 - ₱80,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Full-time", "On-site"],
      title: "DevOps Engineer",
      description: "Manage and automate IT infrastructure.",
      salaryRange: "₱55,000 - ₱75,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Part-time", "Hybrid"],
      title: "Marketing Specialist",
      description: "Develop and implement marketing strategies.",
      salaryRange: "₱35,000 - ₱50,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Contract", "Remote"],
      title: "Content Writer",
      description: "Create engaging content for various platforms.",
      salaryRange: "₱25,000 - ₱40,000",
    },
    {
      imgPath: "/placeholder.png",
      badges: ["Full-time", "On-site"],
      title: "Project Manager",
      description: "Oversee project planning and execution.",
      salaryRange: "₱70,000 - ₱90,000",
    },
  ];
  return (
    <>
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
                  <BreadcrumbPage>Browse Jobs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="p-4">
            <div className="flex flex-row gap-4">
              <SearchBar />
              <JobsFilter />
              <JobsView />
              <JobsSort />
              <JobPagination />
            </div>
            <div className="grid grid-cols-4 gap-6 mt-4">
              {jobsData.map((job, index) => (
                <GridCard key={index} data={job} />
              ))}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
