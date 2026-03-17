import { getUserRole } from "@/lib/auth";
import HRJobApplications from "@/components/hr/jobs/applications/job-applications-page";
import AdminJobApplications from "@/components/admin/jobs/applications/job-applications-page";

export default async function JobApplicationsPage() {
  const userRole = await getUserRole();

  if (userRole === "HR") {
    return <HRJobApplications />;
  }

  if (userRole === "ADMIN") {
    return <AdminJobApplications />;
  }

  return <div> Unauthorized</div>;
}
