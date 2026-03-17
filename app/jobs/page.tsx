import AdminJobs from "@/components/admin/jobs";
import ApplicantJobs from "@/components/applicant/jobs";
import HRJobs from "@/components/hr/jobs";
import PublicJobs from "@/components/public-jobs";
import { getUserRole } from "@/lib/auth";

export default async function JobsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantJobs />;
  }

  if (userRole === "HR") {
    return <HRJobs />;
  }

  if (userRole === "ADMIN") {
    return <AdminJobs />;
  }

  return <PublicJobs />;
}
