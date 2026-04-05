import { getUserRole } from "@/lib/auth";
import ApplicantApplicationDetails from "@/components/applicant/applications/application-details-page";

export default async function ApplicationDetailsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantApplicationDetails />;
  }
}
