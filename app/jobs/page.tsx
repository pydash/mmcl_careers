import AdminJobs from "@/components/admin/jobs";
import ApplicantJobs from "@/components/applicant/jobs";
import HRJobs from "@/components/hr/jobs";
import PublicJobs from "@/components/public-jobs";
import { getUserRole } from "@/lib/auth";

export default async function JobsPage({ searchParams }: any) {
  const userRole = await getUserRole();
  const filter = (await searchParams)?.filter;

  if (userRole === "APPLICANT") {
    return <ApplicantJobs filter={filter} />;
  }

  if (userRole === "HR") {
    return <HRJobs />;
  }

  if (userRole === "ADMIN") {
    return <AdminJobs />;
  }

  return <PublicJobs />;
}
