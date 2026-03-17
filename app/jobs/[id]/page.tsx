import { getUserRole } from "@/lib/auth";
import ApplicantJobDetailsPage from "@/components/applicant/jobs/job-details-page";
import HRJobDetailsPage from "@/components/hr/jobs/job-details-page";
import AdminJobDetailsPage from "@/components/admin/jobs/job-details-page";

export default async function JobDetailsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantJobDetailsPage />;
  }

  if (userRole === "HR") {
    return <HRJobDetailsPage />;
  }

  if (userRole === "ADMIN") {
    return <AdminJobDetailsPage />;
  }

  return <div>Public Job Details</div>;
}
