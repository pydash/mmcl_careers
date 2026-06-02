import { getUserFromRequest, getUserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

import ApplicantDashboardPage from "@/components/applicant/dashboard/dashboard-page";
import HRDashboardPage from "@/components/hr/dashboard/dashboard-page";
import AdminDashboardPage from "@/components/admin/dashboard/dashboard-page";

export default async function DashboardPage() {
  const user = await getUserFromRequest();

  if (!user) {
    redirect("/login");
  }

  const role = await getUserRole();

  if (role === "APPLICANT") {
    return <ApplicantDashboardPage />;
  }

  if (role === "HR") {
    return <HRDashboardPage />;
  }

  if (role === "ADMIN") {
    return <AdminDashboardPage />;
  }
}
