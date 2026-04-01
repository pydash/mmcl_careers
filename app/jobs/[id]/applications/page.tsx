import { getUserRole } from "@/lib/auth";
import HRJobApplications from "@/components/hr/jobs/applications/job-applications-page";
import AdminJobApplications from "@/components/admin/jobs/applications/job-applications-page";
import NotPermittedPage from "@/components/not-permitted-page";

export default async function JobApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userRole = await getUserRole();

  if (userRole === "HR") {
    return <HRJobApplications id={id} />;
  }

  if (userRole === "ADMIN") {
    return <AdminJobApplications id={id} />;
  }

  return <NotPermittedPage />;
}
