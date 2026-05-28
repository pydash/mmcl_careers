import PublicJobsPage from "@/components/public/jobs-page";
import ApplicantJobsPage from "@/components/applicant/jobs/jobs-page";
import HRJobsPage from "@/components/hr/jobs/jobs-page";
import AdminJobsPage from "@/components/admin/jobs/jobs-page";
import { getUserRole } from "@/lib/auth";

export default async function JobsPage() {
  const role = await getUserRole();

  if (!role) {
    return <PublicJobsPage />;
  }

  if (role === "APPLICANT") {
    return <ApplicantJobsPage />;
  }

  if (role === "HR") {
    return <HRJobsPage />;
  }

  if (role === "ADMIN") {
    return <AdminJobsPage />;
  }
}
