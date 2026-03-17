import { getUserRole } from "@/lib/auth";
import ApplicantApplications from "@/components/applicant/applications";
import HRApplications from "@/components/hr/applications";
import AdminApplications from "@/components/admin/applications";

export default async function ApplicationsPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantApplications />;
  }

  if (userRole === "HR") {
    return <HRApplications />;
  }

  if (userRole === "ADMIN") {
    return <AdminApplications />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
