import PublicJobPage from "@/components/public/job-page";
import ApplicantJobPage from "@/components/applicant/jobs/job-page";
import { getUserRole } from "@/lib/auth";

export default async function JobPage() {
  const role = await getUserRole();

  if (!role) {
    return <PublicJobPage />;
  }

  if (role === "APPLICANT") {
    return <ApplicantJobPage />;
  }
}
