import ApplicantJobApplyPage from "@/components/applicant/jobs/apply/apply-page";
import NotPermittedPage from "@/components/not-permitted-page";
import { getUserRole } from "@/lib/auth";

export default async function ApplyJobPage() {
  const role = await getUserRole();

  if (role === "APPLICANT") {
    return <ApplicantJobApplyPage />;
  }

  return <NotPermittedPage />;
}
