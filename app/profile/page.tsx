import ApplicantProfilePage from "@/components/applicant/profile/profile-page";
import NotPermittedPage from "@/components/not-permitted-page";
import { getUserRole } from "@/lib/auth";

export default async function ProfilePage() {
  const role = await getUserRole();

  if (!role) {
    return <NotPermittedPage />;
  }

  if (role === "APPLICANT") {
    return <ApplicantProfilePage />;
  }
}
