import { getUserRole } from "@/lib/auth";
import ApplicantCreateProfile from "@/components/applicant/profile/create-profile-page";

export default async function CreateProfilePage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantCreateProfile />;
  }
}
