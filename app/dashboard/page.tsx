import { getUserRole } from "@/lib/auth";
import ApplicantDashboard from "@/components/applicant/dashboard";
import HrDashboard from "@/components/hr/dashboard";
import AdminDashboard from "@/components/admin/dashboard";

export default async function DashboardPage() {
  const userRole = await getUserRole();

  if (userRole === "APPLICANT") {
    return <ApplicantDashboard />;
  }

  if (userRole === "HR") {
    return <HrDashboard />;
  }

  if (userRole === "ADMIN") {
    return <AdminDashboard />;
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">Unauthorized</h1>
    </div>
  );
}
