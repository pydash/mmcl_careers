import AdminApplicationsPage from "@/components/admin/applications/applications-page";
import ApplicantApplicationsPage from "@/components/applicant/applications/applications-page";
import HRApplicationsPage from "@/components/hr/applications/applications-page";
import { getUserFromRequest, getUserRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ApplicationsPage() {
  const user = await getUserFromRequest();

  if (!user) {
    redirect("/login");
  }

  const role = await getUserRole();

  if (role === "APPLICANT") {
    return <ApplicantApplicationsPage />;
  }

  if (role === "HR") {
    return <HRApplicationsPage />;
  }

  if (role === "ADMIN") {
    return <AdminApplicationsPage />;
  }
}
