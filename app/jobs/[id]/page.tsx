import { getUserRole } from "@/lib/auth";
import ApplicantJobDetailsPage from "@/components/applicant/jobs/job-details-page";
import HRJobDetailsPage from "@/components/hr/jobs/job-details-page";
import AdminJobDetailsPage from "@/components/admin/jobs/job-details-page";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantJobDetailsPage id={id} />;
  }

  if (userRole === "HR") {
    return <HRJobDetailsPage id={id} />;
  }

  if (userRole === "ADMIN") {
    return <AdminJobDetailsPage id={id} />;
  }

  return <div>Public Job Details</div>;
}
