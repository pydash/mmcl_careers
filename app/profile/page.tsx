import { getUserRole } from "@/lib/auth";
import ApplicantProfile from "@/components/applicant/profile";
import HrProfile from "@/components/hr/profile";
import AdminProfile from "@/components/admin/profile";

export default async function ProfilePage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantProfile />;
  }

  if (userRole === "HR") {
    return <HrProfile />;
  }

  if (userRole === "ADMIN") {
    return <AdminProfile />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
