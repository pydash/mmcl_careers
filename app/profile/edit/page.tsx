import ApplicantProfileEdit from "@/components/applicant/profile/edit-profile-page";
import HrProfileEdit from "@/components/hr/profile/edit/profile-edit-form";
import { getUserRole } from "@/lib/auth";

export default async function EditProfilePage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantProfileEdit />;
  }

  if (userRole === "HR") {
    return <HrProfileEdit />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
